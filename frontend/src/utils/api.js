const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://workdash-gb23.onrender.com'
    : 'http://localhost:4000';

export { API_URL };
