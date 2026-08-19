import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CommentSection from '../components/CommentSection';
import { useState } from 'react';
import { AiFillLike, AiOutlineLike, AiFillDislike, AiOutlineDislike } from 'react-icons/ai';
import { FaShare } from 'react-icons/fa';

function VideoPlayer() {
  const { id } = useParams(); // Gets video ID from URL
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(1234);
  const [dislikesCount, setDislikesCount] = useState(56);

  // Mock video data - this would come from API
  const videoData = {
    id: id,
    title: "Sample Video Title",
    creator: "Video Creator",
    description: "This is a sample video description. It would contain details about the video content.",
    views: "1.2M",
    uploadedAt: "2 days ago"
  };

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
      setLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setLiked(true);
      if (disliked) {
        setDislikesCount(dislikesCount - 1);
        setDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikesCount(dislikesCount - 1);
      setDisliked(false);
    } else {
      setDislikesCount(dislikesCount + 1);
      setDisliked(true);
      if (liked) {
        setLikesCount(likesCount - 1);
        setLiked(false);
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
        {/* Video Player */}
        <div style={{
          backgroundColor: 'black',
          borderRadius: '12px',
          overflow: 'hidden',
          aspectRatio: '16/9',
          marginBottom: '16px'
        }}>
          <video
            width="100%"
            height="100%"
            controls
            style={{ display: 'block' }}
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support video.
          </video>
        </div>

        {/* Video Info */}
        <h2 style={{ margin: '0 0 8px 0', color: '#333' }}>{videoData.title}</h2>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div>
            <p style={{ margin: '0', color: '#666' }}>👤 {videoData.creator}</p>
            <p style={{ margin: '4px 0 0 0', color: '#888', fontSize: '14px' }}>
              👁️ {videoData.views} views • {videoData.uploadedAt}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Like Button */}
            <button
              onClick={handleLike}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #ddd',
                background: liked ? '#1a73e8' : 'white',
                color: liked ? 'white' : '#333',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {liked ? <AiFillLike /> : <AiOutlineLike />}
              {likesCount}
            </button>
            
            {/* Dislike Button */}
            <button
              onClick={handleDislike}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #ddd',
                background: disliked ? '#d93025' : 'white',
                color: disliked ? 'white' : '#333',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
              {dislikesCount}
            </button>
            
            <button
              onClick={() => alert('Share link copied!')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #ddd',
                background: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <FaShare /> Share
            </button>
          </div>
        </div>

        {/* Description */}
        <div style={{
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '16px'
        }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Description</h4>
          <p style={{ margin: '0', color: '#555', lineHeight: '1.6' }}>
            {videoData.description}
          </p>
        </div>

        {/* Comments */}
        <CommentSection videoId={id} />
      </div>
    </div>
  );
}

export default VideoPlayer;