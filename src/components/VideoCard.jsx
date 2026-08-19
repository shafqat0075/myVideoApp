import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillLike, AiOutlineLike, AiFillDislike, AiOutlineDislike } from 'react-icons/ai';
import { FaComment, FaShare } from 'react-icons/fa';

function VideoCard({ id, title, creator, views, videoUrl, uploadedAt }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 1000));
  const [dislikesCount, setDislikesCount] = useState(Math.floor(Math.random() * 100));

  const handleLike = (e) => {
    e.stopPropagation();
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

  const handleDislike = (e) => {
    e.stopPropagation();
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

  const handleShare = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/video/${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('✅ Share link copied to clipboard!');
    }).catch(() => {
      alert('📋 Share link: ' + shareUrl);
    });
  };

  return (
    <div 
      onClick={() => navigate(`/video/${id}`)}
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        overflow: 'hidden',
        margin: '12px',
        width: '320px',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}
    >
      <video 
        width="100%" 
        height="200" 
        controls
        style={{ backgroundColor: '#000', display: 'block' }}
        onClick={(e) => e.stopPropagation()}
      >
        <source src={videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"} type="video/mp4" />
        Your browser does not support video.
      </video>
      
      <div style={{ padding: '16px' }}>
        <h4 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '16px', 
          fontWeight: '600',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: '1.4'
        }}>
          {title || "Sample Video"}
        </h4>
        
        <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>
          👤 {creator || "Unknown Creator"}
        </p>
        
        <p style={{ margin: '0 0 8px 0', color: '#888', fontSize: '13px' }}>
          👁️ {views || "0"} views • {uploadedAt || "Recently"}
        </p>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #f0f0f0',
          paddingTop: '12px',
          marginTop: '8px'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Like Button */}
            <button
              onClick={handleLike}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: liked ? '#1a73e8' : '#666',
                fontSize: '14px',
                padding: '4px 8px',
                borderRadius: '4px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {liked ? <AiFillLike size={18} /> : <AiOutlineLike size={18} />}
              <span>{likesCount}</span>
            </button>
            
            {/* Dislike Button */}
            <button
              onClick={handleDislike}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: disliked ? '#d93025' : '#666',
                fontSize: '14px',
                padding: '4px 8px',
                borderRadius: '4px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {disliked ? <AiFillDislike size={18} /> : <AiOutlineDislike size={18} />}
              <span>{dislikesCount}</span>
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <FaComment 
              size={18} 
              color="#666"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/video/${id}`);
              }}
              onMouseEnter={(e) => e.currentTarget.color = '#1a73e8'}
              onMouseLeave={(e) => e.currentTarget.color = '#666'}
            />
            <FaShare 
              size={16} 
              color="#666"
              style={{ cursor: 'pointer' }}
              onClick={handleShare}
              onMouseEnter={(e) => e.currentTarget.color = '#1a73e8'}
              onMouseLeave={(e) => e.currentTarget.color = '#666'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;