import React, { useRef, useState } from "react";
import axios from "axios";
import UploadCard from "../components/Dashboard/UploadCard";
import PdfCard from "../components/Dashboard/PdfCard";
import { handleApiError } from "@/utils/handleApiError";
import { Toaster, toast } from "react-hot-toast";
import { useMyPdfs } from "../hooks/useMyPdfs";

function Dashboard() {
  const fileInputRef = useRef(null);
  const { pdfs, setPdfs } = useMyPdfs();
  const [uploading, setUploading] = useState(false);

  console.log(pdfs);
  const handleCardClick = () => {
    if (!uploading) fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Frontend guards
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB");
      e.target.value = "";
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://localhost:4000/api/v1/uploads/pdf", formData, { withCredentials: true });

      const uploadData = res?.data?.data?.pdf;
      if (!uploadData) throw new Error("Invalid upload response");

      setPdfs((prev) => [...prev, uploadData]);
      toast.success("PDF uploaded successfully");
    } catch (err) {
      handleApiError(err);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDeletePdf = async (publicId) => {
    // optimistic update
    const previousPdfs = pdfs;
    setPdfs((prev) => prev.filter((p) => p.publicId !== publicId));

    try {
      await axios.delete(`http://localhost:4000/api/v1/uploads/pdf/${encodeURIComponent(publicId)}`, { withCredentials: true });

      toast.success("PDF deleted");
    } catch (err) {
      // rollback on failure
      setPdfs(previousPdfs);
      handleApiError(err);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster />

      <div>
        <h1 className="text-2xl font-semibold text-white">Uploads</h1>
        <p className="text-sm text-neutral-400">Upload PDF files to process with AI</p>
      </div>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <UploadCard onClick={handleCardClick} disabled={uploading} />
        {pdfs.map((pdf) => (
          <PdfCard key={pdf.publicId} pdf={pdf} onSubmit={() => console.log("Submit to AI")} onDelete={() => handleDeletePdf(pdf.publicId)} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
