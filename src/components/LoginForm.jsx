import React, { useState } from 'react';

// React-Router
import { Link, useHistory } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../Redux/slices/authenticationSlice';
import { selectError } from '../Redux/slices/errorSlice';

import useForm from './useForm';
import validate from './validators/ValidateLogin';

const initialState = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const serverError = useSelector(selectError);

  const history = useHistory();

  const { handleChange, handleSubmit, data, errors } = useForm(initialState, validate, submit);

  // Témoin soumission formulaire
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit() {
    setIsSubmitting(true);
    dispatch(fetchUser(data.email, data.password, history));
    setIsSubmitting(false);
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
          {serverError && <p className="form__error">{serverError}</p>}

          <button type="submit" disabled={isSubmitting} className="form__submit">
            Se connecter
          </button>
        </form>
        <div className="login__redirection">
          <p>Vous n&apos;avez pas de compte ?</p>
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
