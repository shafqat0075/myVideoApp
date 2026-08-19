import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, requireCreator = false }) {
  const { isAuthenticated, isCreator, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requireCreator && !isCreator()) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <h2 style={{ color: '#d93025' }}>⛔ Access Denied</h2>
        <p style={{ color: '#666' }}>You need creator privileges to access this page.</p>
        <a href="/" style={{ color: '#1a73e8', textDecoration: 'none' }}>Go to Home</a>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;