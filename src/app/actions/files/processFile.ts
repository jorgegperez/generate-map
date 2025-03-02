"use server";

import { OpenAI, Settings, LlamaParseReader } from "llamaindex";
import fs from "fs";
import os from "os";
import path from "path";
import { writeFile } from "fs/promises";
import { EProcessingStatus } from "@/constants";
import { File } from "@/models/File";
import { PROMPT_CREATE_HIERARCHICAL_SECTIONS } from "@/constants/prompt";
import { ISection } from "@/constants/mindmap";

Settings.llm = new OpenAI({
  model: "gpt-4o-mini",
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_TOKENS = 10000;

export async function extractMarkdown(
  buffer: Buffer,
  fileName: string,
  fileId: string
) {
  const tempDir = os.tmpdir();
  const uniquePrefix =
    Date.now() + "-" + Math.random().toString(36).substring(2);
  const tempFilePath = path.join(tempDir, `${uniquePrefix}-${fileName}`);

  try {
    await writeFile(tempFilePath, buffer);
    const reader = new LlamaParseReader({ resultType: "markdown" });
    const documents = await reader.loadData(tempFilePath);
    const markdownText = documents.map((doc) => doc.text).join("\n");

    await File.findByIdAndUpdate(fileId, {
      markdownText,
      processingStatus: EProcessingStatus.COMPLETED,
    });
  } catch (error) {
    console.error("Processing error:", error);
    await File.findByIdAndUpdate(fileId, {
      processingStatus: EProcessingStatus.FAILED,
    });
  } finally {
    try {
      if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
    } catch (cleanupError) {
      console.error("Error cleaning up temp file:", cleanupError);
    }
  }
}

export async function createMindMap(markdown: string) {
  const rawSections = splitMarkdownIntoSections(markdown);
  const hierarchicalIndex = await createHierarchicalIndex(rawSections);
  const sections = mapMarkdownToSections(hierarchicalIndex, rawSections);
  return sections;
}

async function createHierarchicalIndex(
  sections: {
    header: string;
    content: string[];
  }[]
) {
  const mergedSections = await mergeSections(sections);
  const llm = new OpenAI({
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
  });

  let hierarchicalSections = "";
  for (const section of mergedSections) {
    const prompt = PROMPT_CREATE_HIERARCHICAL_SECTIONS.replace(
      "{currentHierarchicalIndex}",
      hierarchicalSections
    ).replace("{markdownChunk}", section);
    const response = await llm.complete({
      prompt,
    });
    hierarchicalSections = response.text;
  }
  return hierarchicalSections;
}

function countTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

async function mergeSections(
  sections: { header: string; content: string[] }[]
): Promise<string[]> {
  const chunks: string[] = [];
  let currentChunk: string[] = [];
  let currentTokenCount = 0;

  for (const section of sections) {
    const sectionText = section.header
      ? `${section.header}\n${section.content.join("\n")}`
      : section.content.join("\n");
    const sectionTokens = await countTokens(sectionText);

    if (
      currentTokenCount + sectionTokens > MAX_TOKENS &&
      currentChunk.length > 0
    ) {
      chunks.push(currentChunk.join("\n\n"));
      currentChunk = [];
      currentTokenCount = 0;
    }

    currentChunk.push(sectionText);
    currentTokenCount += sectionTokens;
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join("\n\n"));
  }

  return chunks;
}

function splitMarkdownIntoSections(markdown: string) {
  const lines = markdown.split("\n");

  const sections: { header: string; content: string[] }[] = [];
  let currentSection: { header: string; content: string[] } = {
    header: "",
    content: [],
  };

  for (const line of lines) {
    if (line.trim().startsWith("#")) {
      if (currentSection.header || currentSection.content.length > 0) {
        sections.push(currentSection);
      }

      currentSection = {
        header: line.trim(),
        content: [],
      };
    } else {
      currentSection.content.push(line);
    }
  }

  if (currentSection.header || currentSection.content.length > 0) {
    sections.push(currentSection);
  }

  return sections;
}

function mapMarkdownToSections(
  hierarchicalIndex: string,
  originalSections: { header: string; content: string[] }[]
): ISection[] {
  const lines = hierarchicalIndex.split("\n");
  const root: ISection[] = [];
  const stack: ISection[] = [];

  // Helper function to find matching original section
  const findOriginalSection = (title: string) => {
    return originalSections.find(
      (section) => section.header.replace(/^#+\s*/, "").trim() === title
    );
  };

  for (const line of lines) {
    if (line.startsWith("#")) {
      const level = line.match(/^#+/)?.[0]?.length || 0;
      const title = line.replace(/^#+\s*/, "").trim();

      // Find matching content from original sections
      const originalSection = findOriginalSection(title);
      const content = originalSection
        ? originalSection.content.join("\n").trim()
        : "";

      const section: ISection = {
        title,
        content,
        level,
        children: [],
      };

      if (level === 1) {
        root.push(section);
        stack.length = 0;
        stack.push(section);
        continue;
      }

      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (stack.length > 0) {
        stack[stack.length - 1].children.push(section);
      }

      stack.push(section);
    }
  }

  return root;
}
