import { useState, useEffect } from 'react';
import { FaUserCircle, FaTrash, FaEdit } from 'react-icons/fa';

function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load comments when videoId changes
  useEffect(() => {
    // Mock comments - will be replaced with API call
    const mockComments = [
      { 
        id: 1, 
        user: "Alice", 
        text: "Great video! Really enjoyed this content 🎉", 
        timestamp: "2 hours ago",
        likes: 5
      },
      { 
        id: 2, 
        user: "Bob", 
        text: "Thanks for sharing this! Learned a lot.", 
        timestamp: "1 hour ago",
        likes: 3
      },
      { 
        id: 3, 
        user: "Charlie", 
        text: "Can you make more videos like this? Amazing work!", 
        timestamp: "30 minutes ago",
        likes: 8
      },
      { 
        id: 4, 
        user: "Diana", 
        text: "This is exactly what I was looking for. Subscribed!", 
        timestamp: "15 minutes ago",
        likes: 12
      },
    ];
    setComments(mockComments);
  }, [videoId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setIsLoading(true);
      const commentObj = {
        id: Date.now(),
        user: "You", // Will be replaced with actual user
        text: newComment,
        timestamp: "Just now",
        likes: 0,
      };
      setComments([commentObj, ...comments]);
      setNewComment('');
      setIsLoading(false);
      // TODO: Send to Azure API
      console.log(`Comment added to video ${videoId}:`, newComment);
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this comment?')) {
      setComments(comments.filter(comment => comment.id !== id));
      // TODO: Delete from Azure API
      console.log(`Deleted comment ${id}`);
    }
  };

  const handleEdit = (id, currentText, e) => {
    e.stopPropagation();
    setEditingId(id);
    setEditText(currentText);
  };

  const handleSaveEdit = (id, e) => {
    e.preventDefault();
    if (editText.trim()) {
      setComments(comments.map(comment => 
        comment.id === id ? { ...comment, text: editText } : comment
      ));
      setEditingId(null);
      setEditText('');
      // TODO: Update on Azure API
      console.log(`Updated comment ${id}`);
    }
  };

  const handleLikeComment = (id, e) => {
    e.stopPropagation();
    setComments(comments.map(comment =>
      comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
    ));
    // TODO: Update likes on Azure API
  };

  return (
    <div style={{
      marginTop: '24px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginBottom: '16px', color: '#333' }}>
        💬 Comments ({comments.length})
      </h3>
      
      {/* Comment Input */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '20px',
              border: '1px solid #ddd',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#1a73e8'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '10px 24px',
              backgroundColor: '#1a1a2e',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
              transition: 'background-color 0.2s',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) e.currentTarget.style.backgroundColor = '#2a2a4e';
            }}
            onMouseLeave={(e) => {
              if (!isLoading) e.currentTarget.style.backgroundColor = '#1a1a2e';
            }}
          >
            {isLoading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
      
      {/* Comments List */}
      <div>
        {comments.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map(comment => (
            <div
              key={comment.id}
              style={{
                display: 'flex',
                gap: '12px',
                padding: '12px 0',
                borderBottom: '1px solid #f0f0f0',
                transition: 'background-color 0.2s',
                borderRadius: '8px',
                paddingLeft: '8px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <FaUserCircle size={36} color="#888" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <strong style={{ fontSize: '14px', color: '#333' }}>{comment.user}</strong>
                    <span style={{ fontSize: '12px', color: '#888' }}>
                      {comment.timestamp}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {/* Like button for comment */}
                    <button
                      onClick={(e) => handleLikeComment(comment.id, e)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#666',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      ❤️ {comment.likes}
                    </button>
                    {comment.user === "You" && (
                      <>
                        <button
                          onClick={(e) => handleEdit(comment.id, comment.text, e)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#666',
                            padding: '4px'
                          }}
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={(e) => handleDelete(comment.id, e)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#d93025',
                            padding: '4px'
                          }}
                        >
                          <FaTrash size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                {editingId === comment.id ? (
                  <form onSubmit={(e) => handleSaveEdit(comment.id, e)}>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #1a73e8',
                        fontSize: '14px',
                        marginTop: '4px',
                        outline: 'none'
                      }}
                      autoFocus
                    />
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <button
                        type="submit"
                        style={{
                          padding: '4px 12px',
                          backgroundColor: '#1a73e8',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        style={{
                          padding: '4px 12px',
                          backgroundColor: '#ddd',
                          color: '#333',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <p style={{ 
                    margin: '4px 0 0 0', 
                    fontSize: '14px', 
                    color: '#333',
                    wordWrap: 'break-word'
                  }}>
                    {comment.text}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;