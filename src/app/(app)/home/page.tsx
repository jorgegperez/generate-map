import MindMap from "@/components/MindMap/MindMap";
import { UploadFileSection } from "@/components/UploadFileSection";

export default function Home() {
  return (
    <div className="flex w-full h-full min-h-screen">
      <UploadFileSection />
      <MindMap />
    </div>
  );
}
