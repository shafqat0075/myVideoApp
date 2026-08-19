import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Upload from './pages/Upload';
import VideoPlayer from './pages/VideoPlayer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route 
            path="/upload" 
            element={
              <ProtectedRoute requireCreator={true}>
                <Upload />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;