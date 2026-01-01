import { handleApiError } from "@/utils/handleApiError";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AiSummary() {
  const { id } = useParams();
  const [singlePdf, setSinglePdf] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/pdfs/${id}`, { withCredentials: true });

        setSinglePdf(res.data.data.pdf);
      } catch (err) {
        handleApiError(err);
      }
    };
    fetchPdf();
  }, [id]);

  const ai = singlePdf?.aiResult;
  return (
    <div className="space-y-8">
      {/* ===== PDF SECTION ===== */}
      <section className="rounded-lg border border-gray-700 bg-gray-800 p-4">
        <h2 className="text-lg font-semibold mb-2">Uploaded PDF</h2>

        <div className="flex items-center justify-between">
          {/* name of file here */}
          <span className="text-sm text-gray-300 truncate">{singlePdf?.originalName}</span>

          <button
            className="px-3 py-1 text-sm rounded bg-yellow-400 text-black hover:bg-yellow-300"
            onClick={() => window.open(singlePdf?.pdfUrl, "_blank")}>
            View PDF
          </button>
        </div>
      </section>

      {/* ===== AI COUNTER DEBATE ===== */}
      <section className="rounded-lg border border-gray-700 bg-gray-800 p-4">
        <h2 className="text-lg font-semibold mb-2">AI Counter Debate</h2>

        <p className="text-sm text-gray-300 leading-relaxed">
          {ai?.counterDebate || "NO AI COUNTER DEBATE GENERATED"}
          <br />
          This section represents the opposing stance in the debate.
        </p>
      </section>

      {/* ===== AI ANALYSIS & FEEDBACK ===== */}
      <section className="rounded-lg border border-gray-700 bg-gray-800 p-4">
        <h2 className="text-lg font-semibold mb-4">AI Analysis</h2>

        <div className="space-y-3 text-sm text-gray-300">
          <div>
            <strong className="text-white">Strengths:</strong>
            <ul className="list-disc list-inside mt-1">
              {ai?.strengths?.length ? ai.strengths.map((s, i) => <li key={i}>{s}</li>) : <li className="opacity-60">No data</li>}
            </ul>
          </div>

          <div>
            <strong className="text-white">Weaknesses:</strong>
            <ul className="list-disc list-inside mt-1">
              {ai?.weaknesses?.length ? ai.weaknesses.map((w, i) => <li key={i}>{w}</li>) : <li className="opacity-60">No data</li>}
            </ul>
          </div>

          <div>
            <strong className="text-white">Grammar & Clarity:</strong>
            <ul className="list-disc list-inside mt-1">
              {ai?.grammarNotes?.length ? ai.grammarNotes.map((g, i) => <li key={i}>{g}</li>) : <li className="opacity-60">No data</li>}
            </ul>
          </div>

          <div>
            <strong className="text-white">Overall Rating:</strong>
            <p className="mt-1">{ai?.rating ? `${ai.rating} / 10` : "Not rated"}</p>
          </div>
        </div>
      </section>
      {/* ===== RELEVANT RESOURCES ===== */}
      <section className="rounded-lg border border-gray-700 bg-gray-800 p-4">
        <h2 className="text-lg font-semibold mb-2">Relevant Resources</h2>

        {ai?.resources?.length ? (
          <ul className="space-y-2 text-sm text-gray-300">
            {ai.resources.map((r, i) => (
              <li key={i}>
                •{" "}
                <a href={r.url} target="_blank" rel="noreferrer" className="text-yellow-400 hover:underline">
                  {r.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">No resources suggested yet.</p>
        )}
      </section>
    </div>
  );
}

export default AiSummary;
