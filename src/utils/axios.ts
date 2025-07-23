import axios from 'axios';

const api = axios.create({
    baseURL: 'https://preventiva-giga-ecf795263aac.herokuapp.com/', // URL base do back-end
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

const apiUpload = axios.create({
    baseURL: 'https://preventiva-giga-ecf795263aac.herokuapp.com',
});

export { axios, apiUpload }; 
export default api;