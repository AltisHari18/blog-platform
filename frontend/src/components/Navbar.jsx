import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">✍️ BlogSpace</Link>
      <div className="nav-links">
        {user ? (
          <>
            <span className="nav-user">Hi, {user.username}</span>
            <Link to="/create" className="btn btn-primary">New Post</Link>
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"    className="btn btn-outline">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}