import { redirect } from "next/navigation";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { getServerSession } from "next-auth/next";
import LogoutButton from "@/components/LogoutButton";
import { UploadFileSection } from "@/components/UploadFileSection";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-secondary-dark">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Bienvenido, {session.user?.name}
              </h1>
            </div>
            <LogoutButton />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <UploadFileSection />
        <section className="flex-1 p-6 bg-secondary-dark">
          <div className="h-full flex items-center justify-center text-text-muted">
            <p>Upload a PDF to generate your mind map</p>
          </div>
        </section>
      </main>
    </div>
  );
}
