"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export const UploadFileSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data.file.fileUrl;
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
      setFile(selectedFile);
      await uploadFile(selectedFile);
      setPageNumber(1);
    } else {
      alert("Please upload a PDF file");
    }
  };

  const handleDrop = useCallback(async (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      await uploadFile(droppedFile);
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
    setNumPages(numPages);
  }

  const handleRemoveFile = () => {
    setFile(null);
    localStorage.removeItem("savedPDF");
  };

  return (
    <section className="w-[30vw] flex-shrink-0 border-r border-border bg-secondary p-6 overflow-y-auto h-[calc(100vh-4rem)]">
      <h2 className="text-xl font-bold mb-6 text-primary-light">
        Upload Document
      </h2>
      <div
        className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {file ? (
          <div className="text-text-secondary">
            <p className="mb-2">Selected file: {file.name}</p>
            <button
              onClick={handleRemoveFile}
              className="mt-2 px-4 py-2 bg-accent text-text-primary rounded-md hover:bg-accent-hover transition-colors"
            >
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

      {file && (
        <div className="mt-6 relative h-full">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              width={window.innerWidth * 0.3 - 48}
              className="max-w-full"
            />
          </Document>
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

      {isUploading && (
        <div className="mt-4 text-text-secondary">Uploading file...</div>
      )}
    </section>
  );
};
