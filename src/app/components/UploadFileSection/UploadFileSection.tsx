"use client";

import { useState, useCallback } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export const UploadFileSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setPageNumber(1); // Reset to first page when new file is uploaded
    } else {
      alert("Please upload a PDF file");
    }
  };

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setPageNumber(1); // Reset to first page when new file is dropped
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

  return (
    <section className="w-[30vw] border-r border-gray-700 bg-gray-800 p-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6 text-cyan-400">Upload Document</h2>
      <div
        className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-cyan-400 transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {file ? (
          <div className="text-gray-400">
            <p className="mb-2">Selected file: {file.name}</p>
            <button
              onClick={() => setFile(null)}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors"
            >
              Remove File
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-400 mb-2">Drag and drop your PDF here</p>
            <p className="text-sm text-gray-500">or</p>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="mt-2 px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 transition-colors inline-block">
                Browse Files
              </span>
            </label>
          </>
        )}
      </div>

      {file && (
        <div className="mt-6 relative">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              width={window.innerWidth * 0.3 - 48}
              className="max-w-full"
            />
          </Document>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm z-10">
            <p className="text-gray-200">
              Page {pageNumber} of {numPages}
            </p>
            <div className="mt-2 space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={pageNumber <= 1}
                className="px-3 py-1 bg-black/50 text-white rounded-md hover:bg-black/70 transition-colors disabled:bg-black/30 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={pageNumber >= (numPages || 1)}
                className="px-3 py-1 bg-black/50 text-white rounded-md hover:bg-black/70 transition-colors disabled:bg-black/30 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
