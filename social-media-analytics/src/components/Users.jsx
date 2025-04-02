import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Card, CardContent, Avatar, Grid } from '@mui/material';
import { getUsers, getUserPosts } from '../services/api';

const Users = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        
        // Get all users
        const usersData = await getUsers();
        
        // Create an array to track post counts
        const userPostCounts = [];
        
        // Get post count for each user
        for (const userId in usersData) {
          const posts = await getUserPosts(userId);
          userPostCounts.push({
            id: userId,
            name: usersData[userId],
            postCount: posts.length,
            avatar: `https://i.pravatar.cc/150?img=${userId}`
          });
        }
        
        // Sort by post count (descending) and take top 5
        const sortedUsers = userPostCounts.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
        
        setTopUsers(sortedUsers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching top users:', err);
        setError('Failed to load top users. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchTopUsers();
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
        Top 5 Users by Post Count
      </Typography>
      
      <Grid container spacing={3}>
        {topUsers.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
              boxShadow: 3,
              position: 'relative',
              overflow: 'visible'
            }}>
              {index === 0 && (
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: -15,
                    right: -15,
                    bgcolor: 'gold',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    boxShadow: 2
                  }}
                >
                  #1
                </Box>
              )}
              <Avatar 
                src={user.avatar} 
                alt={user.name}
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Posts: {user.postCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Users;
