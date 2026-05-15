import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import CommentSection from '../components/CommentSection';

export default function PostDetail() {
  const { id } = useParams();
  const [post,    setPost]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setPost(data);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="loader">Loading…</div>;
  if (!post)   return <div>Post not found. <Link to="/">Go Home</Link></div>;

  return (
    <div className="page post-detail-page">
      <Link to="/" className="back-link">← Back to Posts</Link>
      <article className="post-full">
        <header className="post-full-header">
          <h1>{post.title}</h1>
          <div className="post-full-meta">
            <span>By @{post.author.username}</span>
            <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}</span>
          </div>
          {post.tags?.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag) => <span key={tag} className="tag">#{tag}</span>)}
            </div>
          )}
        </header>
        <div className="post-full-content">
          {post.content.split('\n').map((para, i) => <p key={i}>{para}</p>)}
        </div>
      </article>
      <CommentSection postId={id} />
    </div>
  );
}