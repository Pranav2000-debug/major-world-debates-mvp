export default function PdfCard({ pdf, onSubmit, onDelete, onDetails }) {
  const createdDate = new Date(pdf.createdAt);

  return (
    <div className="relative group rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 transition hover:border-yellow-400 hover:shadow-[0_0_18px_rgba(234,179,8,0.18)]">
      {/* PROCESSING OVERLAY */}
      {pdf.status === "processing" && (
        <div className="absolute inset-0 z-20 bg-black/70 flex items-center justify-center">
          <span className="text-sm text-yellow-400 animate-pulse">Processing…</span>
        </div>
      )}

      {/* PREVIEW */}
      <div className="relative h-48 bg-neutral-800">
        <img src={pdf.previewImageUrl} alt={pdf.originalName} className="h-full w-full object-cover" />

        {/* HOVER ACTIONS (ONLY WHEN NOT PROCESSING) */}
        {pdf.status !== "processing" && (
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 group-hover:opacity-100 transition">
            {/* PRIMARY ACTION */}
            {pdf.status === "uploaded" && (
              <button
                onClick={onSubmit}
                className="rounded-md bg-slate-800/80 text-slate-200 border border-slate-700/60 transition-all duration-200 px-3 py-1.5 text-sm font-medium hover:bg-amber-400/90 hover:text-black hover:border-amber-400/50">
                Submit to AI
              </button>
            )}

            {pdf.status === "completed" && (
              <button onClick={onDetails} className="rounded-md bg-slate-800/80 text-slate-200 border border-slate-700/60 transition-all duration-200 px-3 py-1.5 text-sm font-medium hover:bg-amber-400/90">
                Details
              </button>
            )}

            {pdf.status === "failed" && (
              <button onClick={onSubmit} className="rounded-md bg-slate-800/80 text-slate-200 border border-slate-700/60 transition-all duration-200 px-3 py-1.5 text-sm font-medium hover:border-slate-600">
                Retry
              </button>
            )}

            {/* DELETE */}
            <button onClick={onDelete} className="rounded-md bg-slate-800/80 text-slate-200 border border-slate-700/60 transition-all duration-200 px-3 py-1.5 text-sm font-medium hover:bg-red-500/80 hover:text-white hover:border-red-500/50">
              Delete
            </button>
          </div>
        )}
      </div>

      {/* ===== METADATA ===== */}
      <div className="p-3 space-y-1">
        <p className="text-sm font-medium text-white truncate">{pdf.originalName}</p>

        <p className="text-xs text-neutral-400">{(pdf.size / 1024 / 1024).toFixed(2)} MB</p>

        <p className="text-xs text-neutral-500">Created on: {createdDate.toLocaleString("en-GB")}</p>

        {/* STATUS LABEL */}
        {pdf.status === "failed" && <p className="text-xs text-red-400 mt-1">AI processing failed</p>}
      </div>
    </div>
  );
}
