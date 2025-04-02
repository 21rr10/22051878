import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import PostCard from './Postcard';
import { getUsers, getUserPosts } from '../services/api';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Get all users
      const usersData = await getUsers();
      setUsers(usersData);
      
      // Get posts for each user
      const allPosts = [];
      for (const userId in usersData) {
        const userPosts = await getUserPosts(userId);
        userPosts.forEach(post => {
          allPosts.push({
            ...post,
            username: usersData[userId]
          });
        });
      }
      
      allPosts.sort((a, b) => b.id - a.id);
      
      setPosts(allPosts);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching feed data:', err);
      setError('Failed to load feed. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && posts.length === 0) {
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
        Latest Posts
      </Typography>
      
      {posts.length > 0 ? (
        posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            username={post.username} 
            showComments={true}
          />
        ))
      ) : (
        <Typography>No posts available.</Typography>
      )}
    </Container>
  );
};

export default Feed;
