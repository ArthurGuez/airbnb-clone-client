import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import useForm from './useForm';
import validate from './validators/ValidateSignup';

const API = process.env.REACT_APP_API;

const initialState = {
  role: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isSubmitting: false,
  errorMessage: null,
};

const SignupForm = () => {
  const { handleChange, handleSubmit, data, errors } = useForm(initialState, submit, validate);
  const history = useHistory();
  async function submit() {
    try {
      const res = await axios.post(`${API}/signup`, {
        role: data.role,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      if (res) {
        history.push('/login');
      }
    } catch (err) {
      console.log('err from signup', err);
    }
  }

  return (
    <div className="signup">
      <h1>Effectuer mon inscription</h1>
      <form
        onSubmit={handleSubmit}
        noValidate
        method="POST"
        action={`${API}/signup`}
        className="signup__form"
      >
        <div className="signup__box-radios">
          <div>
            <label htmlFor="Host">
              Hôte
              <input
                type="radio"
                name="role"
                id="Host"
                className="signup__input--host"
                onChange={handleChange}
                value="host"
              />
            </label>
          </div>
          <div>
            <label htmlFor="Tourist">
              Touriste
              <input
                type="radio"
                name="role"
                id="Tourist"
                className="signup__input--tourist"
                onChange={handleChange}
                value="tourist"
              />
            </label>
          </div>
        </div>
        <div className="signup__input-name">
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            onChange={handleChange}
            value={data.firstName}
            className="signup__input-firstname"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            onChange={handleChange}
            value={data.lastName}
            className="signup__input-lastname"
          />
          <p className="signup__input-comment">
            Assurez-vous qu'il correspond au nom figurant sur votre pièce d'identité.
          </p>
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div className="signup__input-boxes">
          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            onChange={handleChange}
            value={data.email}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <p className="signup__input-comment">
            Nous vous enverrons les confirmations et les reçus de voyage par e-mail.
          </p>
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            value={data.password}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <button type="submit" className="signup__button">
            S'inscrire
          </button>
        </div>
      </form>
      <div className="signup__redirect">
        <p>Vous avez déjà un compte ?</p>
        <Link to="/login">Se connecter</Link>
      </div>
    </div>
  );
};

export default SignupForm;
