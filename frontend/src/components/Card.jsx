import React from "react";
import { Link } from "react-router-dom";

const Card = ({ topic }) => {
  const shortSummary =
    topic.summary && topic.summary.length > 120
      ? topic.summary.slice(0, 120) + "..."
      : topic.summary || "No summary available";

  return (
    <div className="border border-gray-700 rounded-xl p-6 mb-6 bg-gray-900 shadow-md hover:shadow-xl transition duration-200">
      <h2 className="text-xl font-bold mb-3 text-white tracking-tight">
        {topic.title}
      </h2>
      <p className="text-gray-300 leading-relaxed">{shortSummary}</p>

      {/* Read More button */}
      <div className="mt-4">
        <Link to={`/article/${topic._id}`}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition">
            Read More →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;