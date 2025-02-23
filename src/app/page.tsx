"use client";

import { UploadFileSection } from "./components";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <UploadFileSection />

      {/* Main Content Section */}
      <section className="flex-1 p-6 bg-gray-900">
        <div className="h-full flex items-center justify-center text-gray-500">
          <p>Upload a PDF to generate your mind map</p>
        </div>
      </section>
    </main>
  );
}
