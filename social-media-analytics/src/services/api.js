import axios from 'axios';

const API_BASE_URL = 'http://20.244.56.144/evaluation-service';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjA0NTAzLCJpYXQiOjE3NDM2MDQyMDMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijk3ZmRhY2I0LTY5ODUtNGJjMC04OTFmLTdkOTdkYTU2ODEzZSIsInN1YiI6InJhbmphbi5yaXRlc2gyMTEwMjAwM0BnbWFpbC5jb20ifSwiZW1haWwiOiJyYW5qYW4ucml0ZXNoMjExMDIwMDNAZ21haWwuY29tIiwibmFtZSI6InJpdGVzaCByYW5qYW4iLCJyb2xsTm8iOiIyMjA1MTg3OCIsImFjY2Vzc0NvZGUiOiJud3B3cloiLCJjbGllbnRJRCI6Ijk3ZmRhY2I0LTY5ODUtNGJjMC04OTFmLTdkOTdkYTU2ODEzZSIsImNsaWVudFNlY3JldCI6InZFeHBGREhadGVBSHpjTnkifQ.yHFr3JcalRBW6XWCxw9O_LuUpxhCBs9-pQqrcPbSs8k'
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// Named exports
export const getUsers = async () => {    
  const response = await api.get('/users');
  return response.data.users;    
};

export const getUserPosts = async (userId) => {   
  const response = await api.get(`/users/${userId}/posts`);
  return response.data.posts;
};

export const getPostComments = async (postId) => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data.comments;
};

export const getAllPostsWithComments = async (users) => {
  const allPosts = [];
  for (const userId in users) {
    const userPosts = await getUserPosts(userId);
    for (const post of userPosts) {
      const comments = await getPostComments(post.id);
      allPosts.push({
        ...post,
        username: users[userId],
        commentCount: comments.length,
        comments: comments
      });
    }
  }
  return allPosts;
};

// Default export if needed
export default api;
