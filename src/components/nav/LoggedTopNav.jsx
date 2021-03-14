import React from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/slices/authenticationSlice';

import worldIcon from '../../assets/images/icons/globe.svg';
import unrollIcon from '../../assets/images/icons/unroll.svg';
import listIcon from '../../assets/images/icons/list.svg';

const LoggedTopNav = ({ openUser, setOpenUser, openCurLang, setOpenCurLang }) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const logOut = async (event) => {
    event.preventDefault();
    dispatch(logout());
    history.push('/');
  };

  function windowOnClick(event) {
    if (!event.target.matches('.topnav__dropdownone-button')) {
      setOpenCurLang(false);
    }
    if (!event.target.matches('.topnav__dropdowntwo-button')) {
      setOpenUser(false);
    }
    window.removeEventListener('click', windowOnClick);
  }

  function curLangMenuOnClick(event) {
    event.stopPropagation();
    setOpenCurLang(true);
    setOpenUser(false);
    window.addEventListener('click', windowOnClick);
  }

  function userMenuOnClick(event) {
    event.stopPropagation();
    setOpenUser(true);
    setOpenCurLang(false);
    window.addEventListener('click', windowOnClick);
  }

  return (
    <nav className="topnav">
      <div className="topnav__dropdownone">
        <button
          type="button"
          className="topnav__dropdownone-button"
          onClick={(event) => {
            curLangMenuOnClick(event);
            setOpenCurLang(!openCurLang);
          }}
        >
          <img
            className="topnav__dropdownone-button-iconone"
            src={worldIcon}
            alt="icône langues devise"
          />
          <img
            className="topnav__dropdownone-button-icontwo"
            src={unrollIcon}
            alt="icône menu deroulant"
          />
        </button>
        {openCurLang ? (
          <ul className="topnav__dropdownone-list">
            <li className="topnav__dropdownone-item">
              <a href="#">
                <img
                  className="topnav__dropdownone-button-iconone"
                  src={worldIcon}
                  alt="icône langues devise"
                />
                <p>Français (FR)</p>
              </a>
            </li>
            <li className="topnav__dropdownone-item">
              <a href="#">
                <p>€</p>
                <p>EUR</p>
              </a>
            </li>
          </ul>
        ) : null}
      </div>
      <div className="topnav__dropdowntwo">
        <button
          type="button"
          className="topnav__dropdowntwo-button"
          onClick={(event) => {
            userMenuOnClick(event);
            setOpenUser(!openUser);
          }}
        >
          <img className="topnav__dropdowntwo-button-iconone" src={listIcon} alt="icône liste" />
          <img
            className="topnav__dropdowntwo-button-icontwolog"
            src="https://pngimage.net/wp-content/uploads/2018/06/react-icon-png-7.png"
            alt="utilisateur connecté"
          />
        </button>
        {openUser ? (
          <ul className="topnav__dropdowntwo-list">
            <li className="topnav__dropdowntwo-item">
              <a href="/inbox">Messages</a>
            </li>
            <li className="topnav__dropdowntwo-item">
              <a href="#">Notifications</a>
            </li>
            <li className="topnav__dropdowntwo-item">
              <a href="/bookings">Voyages</a>
            </li>
            <li className="topnav__dropdowntwo-item">
              <a href="/wishlists">Enregistrés</a>
            </li>
            <li className="topnav__dropdowntwo-item">
              <a href="/account-settings">Profil</a>
            </li>
            <li className="topnav__dropdowntwo-item">
              <a href="/login" onClick={logOut}>
                Déconnexion
              </a>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

export default LoggedTopNav;
