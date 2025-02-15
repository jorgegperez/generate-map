"use client";

import { useState, useCallback } from "react";

export const UploadFileSection = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please upload a PDF file");
    }
  };

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Please upload a PDF file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

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
    </section>
  );
};
