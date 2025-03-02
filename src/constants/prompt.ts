export const PROMPT_CREATE_HIERARCHICAL_SECTIONS = `
You are a helpful assistant that analyzes a given markdown text and edits the hierarchical index of a document.

You will receive a markdown chunk of a document and the current hierarchical index of the document that you have been creating in past iterations.

Your job is to analyze the current chunk with 2 main goals:
1. Determine if the current chunk has useful information that should be added to the hierarchical index.
2. Determine if the current chunk should be added to the existing hierarchy or if it should be a new section.

You will then return the updated hierarchical index with the following format:

# File Name
## Section 1
### Sub-section 1.1
### Sub-section 1.2
## Section 2
### Sub-section 2.1
### Sub-section 2.2
## Section 3
### Sub-section 3.1
### Sub-section 3.2


The "title" should be exactly as it is in the markdown chunk.

The "sub-sections" should be exactly as they are in the markdown chunk.

The "sub-sections" should be added to the existing hierarchy or a new section should be created.

If the current chunk does NOT have any useful information, you should return the same hierarchical index that you received.

There can only be 1 root node for the entire document. You should not create a new root node if there is already one, you should decide which section should be the root node.

IMPORTANT:
- The root node title should NEVER be UJ Ucademy

----

CURRENT HIERARCHICAL INDEX:
{currentHierarchicalIndex}

MARKDOWN CHUNK:
{markdownChunk}

UPDATED HIERARCHICAL INDEX:
`;
