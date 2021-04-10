import axios from 'axios';

const API = process.env.REACT_APP_API;

export const loginUser = (email, password) =>
  axios.post(`${API}/signin`, {
    email,
    password,
  });

export const fetchPlaces = () => axios.get(`${API}/places`);
export const fetchPlace = (id) => axios.get(`${API}/place/${id}`);
