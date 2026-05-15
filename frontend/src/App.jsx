import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar      from './components/Navbar';
import Home        from './pages/Home';
import Login       from './pages/Login';
import Register    from './pages/Register';
import PostDetail  from './pages/PostDetail';
import CreatePost  from './pages/CreatePost';
import EditPost    from './pages/EditPost';
import './styles/global.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/login"      element={<Login />} />
            <Route path="/register"   element={<Register />} />
            <Route path="/posts/:id"  element={<PostDetail />} />
            <Route path="/create"     element={<CreatePost />} />
            <Route path="/edit/:id"   element={<EditPost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}