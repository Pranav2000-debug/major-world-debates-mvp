import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Article = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await fetch("https://major-world-debates-mvp.onrender.com/api/topics");
        const data = await res.json();
        const found = data.find((t) => t._id === id);
        setTopic(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!topic) return <p className="text-center mt-10">Topic not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{topic.title}</h1>
      <p className="mb-4">{topic.summary}</p>
      <div className="mb-4"><strong>Pros:</strong> {topic.pros}</div>
      <div className="mb-4"><strong>Cons:</strong> {topic.cons}</div>
      {topic.url && (
        <a href={topic.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          Read full article
        </a>
      )}
      <p className="mt-4 text-gray-600">{topic.fullArticle}</p>
    </div>
  );
};

export default Article;