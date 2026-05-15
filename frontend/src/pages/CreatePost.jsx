import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

export default function CreatePost() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [error, setError] = useState('');

  if (!user) return <p>Please login to create a post.</p>;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const tagsArray = form.tags.split(',').map((t) => t.trim()).filter(Boolean);
    try {
      const { data } = await API.post('/posts', {
        title:   form.title,
        content: form.content,
        tags:    tagsArray,
      });
      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div className="page form-page">
      <h1>Create New Post</h1>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={form.title}
            onChange={handleChange} required placeholder="Post title" />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea name="content" value={form.content}
            onChange={handleChange} required rows={10} placeholder="Write your post…" />
        </div>
        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input type="text" name="tags" value={form.tags}
            onChange={handleChange} placeholder="react, javascript, webdev" />
        </div>
        <button type="submit" className="btn btn-primary">Publish Post</button>
      </form>
    </div>
  );
}