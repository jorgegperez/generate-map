"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { UploadFileSection } from "./components";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen">
      <UploadFileSection />
      <section className="flex-1 p-6 bg-secondary-dark">
        <div className="h-full flex items-center justify-center text-text-muted">
          <p>Upload a PDF to generate your mind map</p>
        </div>
      </section>
    </main>
  );
}
