import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Hero from "../components/Hero";

const Home = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("https://major-world-debates-mvp.onrender.com/api/topics");
        const data = await res.json();
        setTopics(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Hero />

      <div className="max-w-4xl mx-auto p-4">
        {loading ? (
          <p className="text-center mt-4 text-gray-300">Loading topics...</p>
        ) : (
          topics.map((topic) => <Card key={topic._id} topic={topic} />)
        )}
      </div>
    </div>
  );
};

export default Home;