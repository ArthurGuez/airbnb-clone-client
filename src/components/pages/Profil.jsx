import React from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/slices/authenticationSlice';

function Profil() {
  const dispatch = useDispatch();

  const history = useHistory();
  const logOut = async (event) => {
    event.preventDefault();
    dispatch(logout());
    history.push('/');
  };
  return (
    <div>
      <h1>Bonjour Client !</h1>
      <button type="button" onClick={logOut}>
        Se déconnecter
      </button>
    </div>
  );
}

export default Profil;
