export default function PdfCard({ pdf, onSubmit, onDelete, onDetails }) {
  const createdDate = new Date(pdf.createdAt);

  return (
    <div className="relative group rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 hover:border-yellow-400 transition">
      {/* ===== PROCESSING OVERLAY (BLOCKS EVERYTHING) ===== */}
      {pdf.status === "processing" && (
        <div className="absolute inset-0 z-20 bg-black/70 flex items-center justify-center">
          <span className="text-sm text-yellow-400 animate-pulse">Processing…</span>
        </div>
      )}

      {/* ===== PREVIEW ===== */}
      <div className="relative h-48 bg-neutral-800">
        <img src={pdf.previewImageUrl} alt={pdf.originalName} className="h-full w-full object-cover" />

        {/* ===== HOVER ACTIONS (ONLY WHEN NOT PROCESSING) ===== */}
        {pdf.status !== "processing" && (
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 group-hover:opacity-100 transition">
            {/* PRIMARY ACTION */}
            {pdf.status === "uploaded" && (
              <button onClick={onSubmit} className="px-3 py-1 text-sm rounded bg-yellow-400 text-black hover:bg-yellow-300">
                Submit to AI
              </button>
            )}

            {pdf.status === "completed" && (
              <button onClick={onDetails} className="px-3 py-1 text-sm rounded bg-yellow-400 text-black hover:bg-yellow-300">
                Details
              </button>
            )}

            {pdf.status === "failed" && (
              <button onClick={onSubmit} className="px-3 py-1 text-sm rounded bg-orange-400 text-black hover:bg-orange-300">
                Retry
              </button>
            )}

            {/* DELETE */}
            <button onClick={onDelete} className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-400">
              Delete
            </button>
          </div>
        )}
      </div>

      {/* ===== METADATA ===== */}
      <div className="p-3 space-y-1">
        <p className="text-sm font-medium text-white truncate">{pdf.originalName}</p>

        <p className="text-xs text-neutral-400">{(pdf.size / 1024 / 1024).toFixed(2)} MB</p>

        <p className="text-xs text-neutral-500">Created on: {createdDate.toDateString()}</p>

        {/* STATUS LABEL (NON-INTRUSIVE) */}
        {pdf.status === "failed" && <p className="text-xs text-red-400 mt-1">AI processing failed</p>}
      </div>
    </div>
  );
}
