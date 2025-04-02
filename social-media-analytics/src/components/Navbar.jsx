import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Social Media Analytics
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Feed
          </Button>
          <Button color="inherit" component={Link} to="/trending">
            Trending Posts
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Top Users
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
