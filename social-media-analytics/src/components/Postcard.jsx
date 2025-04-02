import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Typography, Avatar, CardActions, Button, Box } from '@mui/material';
import { getPostComments } from '../services/api';

const getRandomAvatar = (userId) => {
  return `https://i.pravatar.cc/150?img=${userId}`;
};

const PostCard = ({ post, username, showComments = false }) => {
  const [comments, setComments] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showComments && expanded && comments.length === 0) {
      setLoading(true);
      getPostComments(post.id)
        .then(data => {
          setComments(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [expanded, post.id, showComments, comments.length]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: '100%', mb: 2, boxShadow: 3 }}>
      <CardHeader
        avatar={
          <Avatar src={getRandomAvatar(post.userid)} alt={username}>
            {username ? username.charAt(0) : 'U'}
          </Avatar>
        }
        title={username || `User ${post.userid}`}
        subheader={`Post ID: ${post.id}`}
      />

      <CardContent>
        <Typography variant="body1">{post.content}</Typography>
      </CardContent>
      
      {showComments && (
        <CardActions>
          <Button 
            onClick={handleExpandClick}
            disabled={loading}
          >
            {loading ? 'Loading...' : expanded ? 'Hide Comments' : `Show Comments (${post.commentCount || 0})`}
          </Button>
        </CardActions>
      )}
      
      {expanded && showComments && (
        <CardContent>
          <Typography variant="h6">Comments:</Typography>
          {comments.length > 0 ? (
            comments.map(comment => (
              <Box key={comment.id} sx={{ mb: 1, p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="body2">{comment.content}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No comments yet.</Typography>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default PostCard;
