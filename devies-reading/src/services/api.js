import axios from 'axios';

const API_URL = 'https://devies-reads-be.onrender.com';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

export const getBooks = async () => {
  const response = await axios.get(`${API_URL}/books`);
  return response.data;
};

export const getBook = async (id) => {
  const response = await axios.get(`${API_URL}/books/${id}`);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const rateBook = async (bookId, rating) => {
  const response = await axios.post(
    `${API_URL}/books/${bookId}/rate`,
    { bookId, rating },
    { headers: getAuthHeader() }
  );
  return response.data;
};

export const updateBookStatus = async (bookId, status) => {
  const response = await axios.post(
    `${API_URL}/books/${bookId}/status`,
    { bookId, status },
    { headers: getAuthHeader() }
  );
  return response.data;
};
