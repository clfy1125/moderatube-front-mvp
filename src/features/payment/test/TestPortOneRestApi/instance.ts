import axios from 'axios';

const portoneApiSecret = import.meta.env.VITE_PORTONE_API_SECRET;

export const instance = axios.create({
  baseURL: 'https://api.portone.io',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `PortOne ${portoneApiSecret}`
  }
});
