"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { uploadFile } from "@/app/actions/files";
import { useSession } from "next-auth/react";
import { useUserFile } from "@/hooks/files/useUserFile";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useQueryClient } from "@tanstack/react-query";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export const UploadFileSection = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const session = useSession();
  const { file, isLoading } = useUserFile(session?.data?.user?.id);
  const queryClient = useQueryClient();

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadFile(formData);

      if (!result.success) {
        throw new Error(result.error);
      }
      queryClient.invalidateQueries({ queryKey: ["files"] });
      return result.file;
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      await handleFileUpload(selectedFile);
      setPageNumber(1);
    } else {
      alert("Please upload a PDF file");
    }
  };

  const handleDrop = useCallback(async (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile && droppedFile.type === "application/pdf") {
      await handleFileUpload(droppedFile);
      setPageNumber(1);
    } else {
      alert("Please upload a PDF file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handlePrevPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setPageNumber((prev) => Math.min(numPages || 1, prev + 1));
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setPdfError(null);
    setNumPages(numPages);
  }

  function onDocumentLoadError(error: Error): void {
    console.error("Error loading PDF:", error);
    setPdfError(
      "Failed to load PDF. The link may have expired. Please try refreshing the page."
    );
  }

  return (
    <section className="w-[30vw] flex-shrink-0 border-r border-border bg-secondary p-6 overflow-y-auto h-[calc(100vh-4rem)]">
      <h2 className="text-xl font-bold mb-6 text-primary">Upload Document</h2>
      <div
        className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {file ? (
          <div className="text-text-secondary">
            <p className="mb-2">Selected file: {file.fileName}</p>
            <button className="mt-2 px-4 py-2 bg-accent text-text-primary rounded-md hover:bg-accent-hover transition-colors">
              Remove File
            </button>
          </div>
        ) : (
          <>
            <p className="text-text-secondary mb-2">
              Drag and drop your PDF here
            </p>
            <p className="text-sm text-text-muted">or</p>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="mt-2 px-4 py-2 bg-primary text-text-primary rounded-md hover:bg-primary-hover transition-colors inline-block">
                Browse Files
              </span>
            </label>
          </>
        )}
      </div>
      {isUploading && (
        <div className="flex flex-col justify-center items-center w-full mt-6 gap-4">
          <PacmanLoader color="#00B0FF" />
          <div className="text-text-primary">Processing file...</div>
        </div>
      )}
      {file && !isLoading && (
        <div className="mt-6 relative">
          {pdfError ? (
            <div className="text-red-500 p-4 bg-red-100 rounded">
              {pdfError}
              <button
                onClick={() => window.location.reload()}
                className="ml-2 underline"
              >
                Refresh page
              </button>
            </div>
          ) : (
            <Document
              file={file.fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
            >
              <Page
                pageNumber={pageNumber}
                width={window.innerWidth * 0.3 - 48}
                className="max-w-full"
              />
            </Document>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-secondary-dark/50 backdrop-blur-sm z-10">
            <p className="text-text-primary">
              Page {pageNumber} of {numPages}
            </p>
            <div className="mt-2 space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={pageNumber <= 1}
                className="px-3 py-1 bg-secondary-dark/50 text-text-primary rounded-md hover:bg-secondary-dark/70 transition-colors disabled:bg-secondary-dark/30 disabled:text-text-muted disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={pageNumber >= (numPages || 1)}
                className="px-3 py-1 bg-secondary-dark/50 text-text-primary rounded-md hover:bg-secondary-dark/70 transition-colors disabled:bg-secondary-dark/30 disabled:text-text-muted disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="mt-4 text-text-secondary">Loading file...</div>
      )}
    </section>
  );
};
