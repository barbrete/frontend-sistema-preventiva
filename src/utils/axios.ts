import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

const apiUpload = axios.create({
    baseURL: 'http://localhost:3000/',
});

export { axios, apiUpload }; 
export default api;