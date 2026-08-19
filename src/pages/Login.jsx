import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('consumer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        navigate('/');
      } else {
        await signup(username, email, password, role);
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Navbar />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '8px', color: '#333' }}>
            {isLogin ? '🔐 Login' : '📝 Sign Up'}
          </h2>
          <p style={{ textAlign: 'center', color: '#888', marginBottom: '24px', fontSize: '14px' }}>
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </p>
          
          {error && (
            <div style={{
              padding: '12px',
              backgroundColor: '#ffebee',
              borderRadius: '6px',
              color: '#d93025',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', color: '#555', fontSize: '14px' }}>
                    Username *
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #ddd',
                      fontSize: '16px',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#1a73e8'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
                    required
                  />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', color: '#555', fontSize: '14px' }}>
                    Account Type
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #ddd',
                      fontSize: '16px'
                    }}
                  >
                    <option value="consumer">👤 Consumer (Watch only)</option>
                    <option value="creator">🎬 Creator (Upload videos)</option>
                  </select>
                </div>
              </>
            )}
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', color: '#555', fontSize: '14px' }}>
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#1a73e8'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
                required
              />
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '4px', color: '#555', fontSize: '14px' }}>
                Password *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#1a73e8'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
                required
                minLength={6}
              />
              {!isLogin && (
                <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                  Password must be at least 6 characters
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#1a1a2e',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                transition: 'background-color 0.2s',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#2a2a4e';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#1a1a2e';
              }}
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>
          
          <p style={{ textAlign: 'center', marginTop: '16px', color: '#666' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#1a73e8',
                cursor: 'pointer',
                fontWeight: 'bold',
                textDecoration: 'underline',
                fontSize: '14px'
              }}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;