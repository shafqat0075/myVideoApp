import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillLike, AiOutlineLike, AiFillDislike, AiOutlineDislike } from 'react-icons/ai';
import { FaComment, FaShare, FaPlayCircle } from 'react-icons/fa';

function VideoCard({ id, title, creator, views, videoUrl, uploadedAt, thumbnail }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 1000) + 100);
  const [dislikesCount, setDislikesCount] = useState(Math.floor(Math.random() * 100));
  const [isHovered, setIsHovered] = useState(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '320px',
        backgroundColor: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: isHovered
          ? '0 20px 40px rgba(0,0,0,0.2)'
          : '0 4px 15px rgba(0,0,0,0.08)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Video Thumbnail */}
      <div style={{
        position: 'relative',
        backgroundColor: '#000',
        height: '180px',
        overflow: 'hidden',
      }}>
        <video
          src={videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isHovered ? 0.3 : 1,
            transition: 'opacity 0.4s ease',
          }}
          muted
          playsInline
        />
        {/* Play Button Overlay */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}>
          <FaPlayCircle size={60} color="#e94560" style={{ filter: 'drop-shadow(0 0 20px rgba(233, 69, 96, 0.6))' }} />
        </div>
        {/* Duration Badge */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '3px 10px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '0.5px',
        }}>
          12:34
        </div>
      </div>

      {/* Video Info */}
      <div style={{ padding: '16px' }}>
        <h4 style={{
          margin: '0 0 8px 0',
          fontSize: '16px',
          fontWeight: '600',
          color: '#1a1a2e',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: '1.4',
          minHeight: '44px',
        }}>
          {title || "Sample Video"}
        </h4>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}>
          <div>
            <p style={{
              margin: '0',
              color: '#666',
              fontSize: '13px',
              fontWeight: '500',
            }}>
              👤 {creator || "Unknown"}
            </p>
            <p style={{
              margin: '2px 0 0 0',
              color: '#999',
              fontSize: '12px',
            }}>
              👁️ {views || "0"} views • {uploadedAt || "Recently"}
            </p>
          </div>
          <div style={{
            backgroundColor: '#e94560',
            color: 'white',
            padding: '2px 12px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.5px',
          }}>
            Trending
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #f0f0f0',
          paddingTop: '12px',
        }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleLike}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: liked ? '#e94560' : 'transparent',
                border: liked ? 'none' : '1px solid #ddd',
                borderRadius: '20px',
                padding: '4px 12px',
                cursor: 'pointer',
                color: liked ? 'white' : '#666',
                fontSize: '13px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
              }}
            >
              {liked ? <AiFillLike size={16} /> : <AiOutlineLike size={16} />}
              {likesCount}
            </button>

            <button
              onClick={handleDislike}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: disliked ? '#d93025' : 'transparent',
                border: disliked ? 'none' : '1px solid #ddd',
                borderRadius: '20px',
                padding: '4px 12px',
                cursor: 'pointer',
                color: disliked ? 'white' : '#666',
                fontSize: '13px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
              }}
            >
              {disliked ? <AiFillDislike size={16} /> : <AiOutlineDislike size={16} />}
              {dislikesCount}
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
            />
            <FaShare
              size={16}
              color="#666"
              style={{ cursor: 'pointer' }}
              onClick={handleShare}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;