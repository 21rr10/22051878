import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import PostCard from './Postcard';
import { getUsers, getAllPostsWithComments } from '../services/api';

const Trending = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxComments, setMaxComments] = useState(0);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setLoading(true);
        
        // Get all users
        const usersData = await getUsers();
        
        // Get all posts with comment counts
        const allPosts = await getAllPostsWithComments(usersData);
        
        // Find the maximum comment count
        const maxCommentCount = Math.max(...allPosts.map(post => post.commentCount));
        setMaxComments(maxCommentCount);
        
        // Filter posts with the maximum comment count
        const trending = allPosts.filter(post => post.commentCount === maxCommentCount);
        
        setTrendingPosts(trending);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching trending posts:', err);
        setError('Failed to load trending posts. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchTrendingPosts();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6" sx={{ my: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ my: 4 }}>
        Trending Posts
      </Typography>
      
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Posts with the highest number of comments ({maxComments})
      </Typography>
      
      {trendingPosts.length > 0 ? (
        trendingPosts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            username={post.username} 
            showComments={true}
          />
        ))
      ) : (
        <Typography>No trending posts available.</Typography>
      )}
    </Container>
  );
};

export default Trending;
