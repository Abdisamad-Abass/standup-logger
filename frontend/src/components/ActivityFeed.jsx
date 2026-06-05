import { useEffect, useState } from "react";
import { getStandups } from "../api/standupApi";
import StandupCard from "./StandupCard";

export default function ActivityFeed({ refreshKey }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tick, setTick] = useState(0);

  const fetchPosts = async () => {
    try {
      const res = await getStandups();
      setPosts(Array.isArray(res.data) ? res.data : res.data?.data || []);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPosts();
  }, []);

  // Poll for updates every 10 second
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPosts();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Refresh when new post is submitted
  useEffect(() => {
    fetchPosts();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow animate-pulse">
        Loading feed...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl">
        Failed to load standups. Try again.
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl text-gray-500">
        No standups yet. Be the first to post
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <StandupCard key={post.id} post={post} postTick={tick} />
      ))}
    </div>
  );
}
