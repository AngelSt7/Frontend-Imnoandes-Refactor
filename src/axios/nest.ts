import axios from 'axios';

const nest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEST_URL,
  withCredentials: true,
});

if (typeof window === 'undefined') {
  nest.defaults.headers.common['Origin'] = process.env.NEXT_PUBLIC_NEST_URL || 'http://localhost:3000';
}

export default nest;