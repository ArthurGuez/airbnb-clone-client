import React from 'react';

import axios from 'axios';

// React-Router
import { Link, useHistory } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { login } from '../Redux/slices/authenticationSlice';

import useForm from './useForm';
import validate from './validators/ValidateLogin';

const API = process.env.REACT_APP_API;

const initialState = {
  email: '',
  password: '',
  isSubmitting: false,
  errorMessage: null,
};

const LoginForm = () => {
  const dispatch = useDispatch();

  const { handleChange, handleSubmit, data, setData, errors } = useForm(
    initialState,
    submit,
    validate
  );

  const history = useHistory();

  async function submit() {
    try {
      const res = await axios.post(`${API}/signin`, {
        email: data.email,
        password: data.password,
      });
      if (res.status === 200) {
        console.log(res);
        dispatch(login(res.data));
        history.push('/');
        return;
      }
      throw res;
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message,
      });
    }
  }

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Connexion</h1>
        <form className="login__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">
            <input
              type="email"
              value={data.email}
              onChange={handleChange}
              name="email"
              id="email"
              placeholder="E-mail"
              className="form__input-email"
            />
          </label>
          {errors.email && <p className="form__error">{errors.email}</p>}

          <label htmlFor="password">
            <input
              type="password"
              value={data.password}
              onChange={handleChange}
              name="password"
              id="password"
              placeholder="Mot de passe"
              className="form__input-password"
            />
          </label>

          {errors.password && <p className="form__error">{errors.password}</p>}

          <button type="submit" disabled={data.isSubmitting} className="form__submit">
            Se connecter
          </button>
        </form>
        <div className="login__redirection">
          <p>Vous n'avez pas de compte ?</p>
          <Link to="/signup">
            <button type="button" className="redirection__button">
              Inscription
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
