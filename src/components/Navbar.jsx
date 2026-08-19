import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout, isAuthenticated, isCreator } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      padding: '12px 24px',
      backgroundColor: '#1a1a2e',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      flexWrap: 'wrap',
      gap: '12px'
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h2 style={{ margin: 0, color: 'white', fontSize: '24px' }}>🎬 VideoShare</h2>
      </Link>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        alignItems: 'center',
        flex: '1',
        maxWidth: '500px',
        margin: '0 16px'
      }}>
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1',
            padding: '8px 16px',
            borderRadius: '20px 0 0 20px',
            border: 'none',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            borderRadius: '0 20px 20px 0',
            border: 'none',
            backgroundColor: '#e94560',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6b81'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e94560'}
        >
          <FaSearch />
        </button>
      </form>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        
        {isAuthenticated() ? (
          <>
            <span style={{ color: '#aaa', fontSize: '14px' }}>
              👤 {user?.username}
              {isCreator() && <span style={{ color: '#e94560', marginLeft: '4px' }}>⭐</span>}
            </span>
            {isCreator() && (
              <Link to="/upload" style={{ color: '#e94560', textDecoration: 'none' }}>
                📤 Upload
              </Link>
            )}
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: '#ddd',
                cursor: 'pointer',
                fontSize: '14px',
                padding: '4px 8px',
                borderRadius: '4px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d93025'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link 
              to="/login" 
              style={{ 
                color: '#fff', 
                textDecoration: 'none',
                backgroundColor: '#e94560',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '14px'
              }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;