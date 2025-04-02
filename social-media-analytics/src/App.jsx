import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Trending from './components/Trending';
import Users from './components/Users';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
