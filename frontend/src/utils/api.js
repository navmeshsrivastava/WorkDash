const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://workdash.onrender.com'
    : 'http://localhost:4000';

export { API_URL };
