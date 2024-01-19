import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;
