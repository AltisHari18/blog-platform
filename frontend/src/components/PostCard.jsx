import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

export default function PostCard({ post, onDelete }) {
  const { user } = useAuth();
  const isAuthor = user && user._id === post.author._id;

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await API.delete(`/posts/${post._id}`);
      onDelete(post._id);
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="post-card">
      <div className="post-card-meta">
        <span className="post-author">@{post.author.username}</span>
        <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <h2 className="post-title">
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
      </h2>
      <p className="post-excerpt">
        {post.content.slice(0, 160)}{post.content.length > 160 ? '…' : ''}
      </p>
      {post.tags?.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag) => <span key={tag} className="tag">#{tag}</span>)}
        </div>
      )}
      <div className="post-actions">
        <Link to={`/posts/${post._id}`} className="btn btn-sm">Read More</Link>
        {isAuthor && (
          <>
            <Link to={`/edit/${post._id}`} className="btn btn-sm btn-outline">Edit</Link>
            <button onClick={handleDelete} className="btn btn-sm btn-danger">Delete</button>
          </>
        )}
      </div>
    </div>
  );
}