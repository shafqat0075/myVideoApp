import { useState } from 'react';
import Navbar from '../components/Navbar';
import VideoCard from '../components/VideoCard';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([
    { id: 1, title: "Funny Cat Compilation 🐱", creator: "PetsWorld", views: "1.2M" },
    { id: 2, title: "Amazing Nature Documentary 🌿", creator: "NatureLens", views: "856K" },
    { id: 3, title: "Gaming Highlights 2024 🎮", creator: "ProGamer", views: "2.1M" },
    { id: 4, title: "DIY Home Projects 🔨", creator: "MakerHub", views: "342K" },
    { id: 5, title: "Cooking Masterclass 🍳", creator: "ChefWorld", views: "567K" },
    { id: 6, title: "Science Experiments 🔬", creator: "LabRat", views: "789K" },
    { id: 7, title: "Travel Vlog: Japan 🇯🇵", creator: "Wanderlust", views: "1.5M" },
    { id: 8, title: "Fitness Workout 💪", creator: "FitLife", views: "234K" },
  ]);

  // Filter videos based on search query
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Navbar onSearch={setSearchQuery} />
      <div style={{ padding: '24px' }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: '#333',
          fontSize: '32px',
          marginBottom: '8px'
        }}>
          🔥 Trending Videos
        </h1>
        <p style={{ 
          textAlign: 'center', 
          color: '#666',
          marginBottom: '24px'
        }}>
          {filteredVideos.length === 0 
            ? `No results found for "${searchQuery}"` 
            : `${filteredVideos.length} videos found`}
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {filteredVideos.map(video => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;