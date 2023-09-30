import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 
    process.env.REACT_APP_API_URL : process.env.REACT_APP_API_DEV_URL;

export const Axios = axios.create({
    baseURL
});
