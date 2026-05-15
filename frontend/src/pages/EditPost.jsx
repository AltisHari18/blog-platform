import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', tags: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setForm({ title: data.title, content: data.content, tags: data.tags?.join(', ') || '' });
      } catch {
        setError('Failed to load post');
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const tagsArray = form.tags.split(',').map((t) => t.trim()).filter(Boolean);
    try {
      await API.put(`/posts/${id}`, { ...form, tags: tagsArray });
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="page form-page">
      <h1>Edit Post</h1>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea name="content" value={form.content} onChange={handleChange} required rows={10} />
        </div>
        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input type="text" name="tags" value={form.tags} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update Post</button>
      </form>
    </div>
  );
}