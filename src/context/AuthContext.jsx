import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      const mockUsers = [
        { id: 1, username: "John", email: "john@email.com", role: "creator" },
        { id: 2, username: "Sarah", email: "sarah@email.com", role: "consumer" },
        { id: 3, username: "NewsChannel", email: "news@email.com", role: "creator" },
      ];
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser) {
        const userData = { ...foundUser, token: 'mock-token-' + Date.now() };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        resolve(userData);
      } else {
        reject(new Error('Invalid credentials'));
      }
    });
  };

  const signup = (username, email, password, role = 'consumer') => {
    return new Promise((resolve) => {
      const newUser = {
        id: Date.now(),
        username,
        email,
        role,
        token: 'mock-token-' + Date.now()
      };
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      resolve(newUser);
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = () => user !== null;
  const isCreator = () => user && user.role === 'creator';

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      signup,
      logout,
      isAuthenticated,
      isCreator,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;