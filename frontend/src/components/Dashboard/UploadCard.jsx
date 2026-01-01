export default function UploadCard({ onClick, disabled = false }) {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className="
        group
        border-2 border-dashed border-neutral-600
        rounded-xl
        h-48
        flex
        items-center
        justify-center
        cursor-pointer
        hover:border-yellow-400
        hover:bg-neutral-800
        transition
      ">
      <div className="flex flex-col items-center gap-2 text-neutral-400 group-hover:text-yellow-400 transition">
        <span className="text-4xl">+</span>
        <span className="text-sm">{disabled ? "Uploading…" : "Upload PDF"}</span>
      </div>
    </div>
  );
}
