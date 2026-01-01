export default function PdfCard({ pdf, onSubmit, onDelete }) {
  return (
    <div className="group rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 hover:border-yellow-400 transition">
      {/* Preview */}
      <div className="relative h-48 bg-neutral-800">
        <img src={pdf.previewImageUrl} alt={pdf.originalName} className="h-full w-full object-cover" />

        {/* Hover actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 group-hover:opacity-100 transition">
          <button onClick={onSubmit} className="px-3 py-1 text-sm rounded bg-yellow-400 text-black hover:bg-yellow-300">
            Submit to AI
          </button>

          <button onClick={onDelete} className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-400">
            Delete
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="p-3 space-y-1">
        <p className="text-sm font-medium text-white truncate">{pdf.originalName}</p>
        <p className="text-xs text-neutral-400">{(pdf.size / 1024 / 1024).toFixed(2)} MB</p>
      </div>
    </div>
  );
}
