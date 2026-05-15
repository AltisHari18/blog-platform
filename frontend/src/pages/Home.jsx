import { useState, useEffect } from 'react';
import API from '../api/axios';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.get('/posts');
        setPosts(data);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = (id) => setPosts(posts.filter((p) => p._id !== id));

  if (loading) return <div className="loader">Loading posts…</div>;

  return (
    <div className="page">
      <h1 className="page-title">Latest Posts</h1>
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to write one!</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}