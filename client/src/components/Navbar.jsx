import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MessageSquareMore, House, Info, MessagesSquare, LayoutDashboard, LogIn, KeyRound, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-1">
          <MessageSquareMore />Feedback Portal
        </Link>
        <div className="hidden md:flex space-x-4 items-center gap-4">
          <Link to="/" className="hover:text-blue-200 flex items-center gap-2">
            <House className="h-4 w-4" />Home
          </Link>
          <Link to="/about" className="hover:text-blue-200 flex items-center gap-2">
            <Info className="h-4 w-4" />About
          </Link>

          {user?.role === 'user' && (
            <Link to="/feedback" className="hover:text-blue-200 flex items-center gap-2">
              <MessagesSquare className="h-4 w-4" />Feedback
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link to="/dashboard" className="hover:text-blue-200 flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />Dashboard
            </Link>
          )}

          {user ? (
            <button onClick={handleLogout} className="hover:text-blue-200 flex items-center gap-2">
              <LogOut className="h-4 w-4" />Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 flex items-center gap-2">
                <LogIn className="h-4 w-4" />Login
              </Link>
              <Link to="/signup" className="hover:text-blue-200 flex items-center gap-2">
                <KeyRound className="h-4 w-4" />Signup
              </Link>
            </>
          )}
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white hover:text-blue-200">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
