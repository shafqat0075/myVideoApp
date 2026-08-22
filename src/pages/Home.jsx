import { useState } from 'react';
import Navbar from '../components/Navbar';
import VideoCard from '../components/VideoCard';
import { getTrendingVideos, getVideosByCategory, searchVideos } from '../services/mockData';

function Home() {
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState(getTrendingVideos());

  const categories = ['All', 'News', 'Entertainment', 'Education', 'Gaming', 'Technology'];

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (cat === 'All') {
      setVideos(getTrendingVideos());
    } else {
      setVideos(getVideosByCategory(cat));
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setVideos(searchVideos(query));
    } else {
      setVideos(category === 'All' ? getTrendingVideos() : getVideosByCategory(category));
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
    }}>
      <Navbar onSearch={handleSearch} />
      
      <div className="container" style={{ paddingTop: '24px' }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '32px',
          boxShadow: '0 10px 40px rgba(233, 69, 96, 0.3)',
          textAlign: 'center',
        }}>
          <h1 style={{
            color: 'white',
            fontSize: '42px',
            fontWeight: '700',
            marginBottom: '8px',
          }}>
            🎬 Welcome to VidFlow
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '18px',
          }}>
            Discover amazing videos from creators around the world
          </p>
        </div>

        {/* Categories */}
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '24px',
          justifyContent: 'center',
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              style={{
                padding: '10px 24px',
                borderRadius: '30px',
                border: 'none',
                background: category === cat
                  ? 'linear-gradient(135deg, #e94560, #ff6b81)'
                  : 'white',
                color: category === cat ? 'white' : '#555',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                boxShadow: category === cat
                  ? '0 4px 15px rgba(233, 69, 96, 0.4)'
                  : '0 2px 8px rgba(0,0,0,0.06)',
                transform: category === cat ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (category !== cat) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (category !== cat) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }
              }}
            >
              {cat === 'All' ? '🔥 All' : cat}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p style={{
          color: '#666',
          marginBottom: '20px',
          fontSize: '14px',
          textAlign: 'center',
        }}>
          {videos.length === 0 ? 'No videos found' : `${videos.length} videos found`}
        </p>

        {/* Video Grid */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
          paddingBottom: '40px',
        }}>
          {videos.map(video => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;