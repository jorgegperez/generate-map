"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { UploadFileSection } from "../components";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// ... resto del código igual 