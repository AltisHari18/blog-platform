import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

export default function CommentSection({ postId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [content,  setContent]  = useState('');
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await API.get(`/comments/${postId}`);
        setComments(data);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      const { data } = await API.post(`/comments/${postId}`, { content });
      setComments([...comments, data]);
      setContent('');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to post comment');
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <p>Loading comments…</p>;

  return (
    <div className="comment-section">
      <h3 className="comment-heading">💬 Comments ({comments.length})</h3>

      {user && (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment…"
            rows={3}
            required
          />
          <button type="submit" className="btn btn-primary">Post Comment</button>
        </form>
      )}

      {!user && <p className="auth-note">Please <a href="/login">login</a> to comment.</p>}

      <div className="comment-list">
        {comments.length === 0 && <p>No comments yet. Be the first!</p>}
        {comments.map((c) => (
          <div key={c._id} className="comment-item">
            <div className="comment-meta">
              <strong>@{c.author.username}</strong>
              <span>{new Date(c.createdAt).toLocaleDateString()}</span>
              {user && user._id === c.author._id && (
                <button
                  onClick={() => handleDelete(c._id)}
                  className="btn btn-xs btn-danger"
                >Delete</button>
              )}
            </div>
            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}