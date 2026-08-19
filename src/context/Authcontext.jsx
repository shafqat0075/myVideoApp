import { createContext, useState, useContext, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Hook to use Auth Context
export function useAuth() {
  return useContext(AuthContext);
}

// Auth Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    // TODO: Call Azure API
    // Mock login - replace with real API call
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (email && password) {
          const user = {
            id: 1,
            username: email.split('@')[0],
            email: email,
            role: 'consumer', // 'creator' or 'consumer'
            token: 'mock-token-12345'
          };
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  // Signup function
  const signup = (username, email, password, role = 'consumer') => {
    // TODO: Call Azure API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username && email && password) {
          const user = {
            id: Date.now(),
            username: username,
            email: email,
            role: role,
            token: 'mock-token-' + Date.now()
          };
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          resolve(user);
        } else {
          reject(new Error('All fields required'));
        }
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null && localStorage.getItem('token') !== null;
  };

  // Check if user is a creator
  const isCreator = () => {
    return user && user.role === 'creator';
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated,
    isCreator,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;