import axios from 'axios';

const API = process.env.REACT_APP_API;

export const loginUser = (email, password) =>
  axios.post(`${API}/signin`, {
    email,
    password,
  });

export const getPlaces = async () => null;
//   await axios.post(`${API}/signin`, {
//     email,
//     password,
//   });
