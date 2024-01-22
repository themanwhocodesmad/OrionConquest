import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 

// Create an Axios instance with common configuration
const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a global error handler
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error globally
    console.error('HTTP Error:', error);
    return Promise.reject(error);
  }
);

export default httpClient;
