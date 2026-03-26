import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASEURL || 'http://localhost:4000';

export const api = axios.create({
    baseURL: `${BASE_URL}/api`
})

export default api;
