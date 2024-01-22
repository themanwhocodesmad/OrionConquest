import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 

const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;
