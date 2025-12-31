import React from "react";

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white dark:text-neutral-100">Uploads</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Upload PDF files to process with AI</p>
      </div>
      {/* Upload cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Placeholder Upload Card */}
        <div className="group border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl h-48 flex items-center justify-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
          <div className="flex flex-col items-center gap-2 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
            <span className="text-4xl">+</span>
            <span className="text-sm">Upload PDF</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
