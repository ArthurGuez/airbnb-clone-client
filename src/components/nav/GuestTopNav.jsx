import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import ModalSignup from '../ModalSignup';
import ModalLogin from '../ModalLogin';
import worldIcon from '../../assets/images/icons/globe.svg';
import unrollIcon from '../../assets/images/icons/unroll.svg';
import listIcon from '../../assets/images/icons/list.svg';
import userIcon from '../../assets/images/icons/user.svg';

const customStyles = {
  content: {
    width: '550px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function GuestTopNav({ openUser, setOpenUser, openCurLang, setOpenCurLang }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
          <img className="topnav__dropdowntwo-button-icontwo" src={userIcon} alt="" />
        </button>
        {openUser ? (
          <ul className="topnav__dropdowntwo-list">
            <li className="topnav__dropdowntwo-item">
              <a href="/login">Connexion</a>
            </li>
            <li className="topnav__dropdowntwo-item">
              <Link className="topnav__link" to="" onClick={() => setModalIsOpen(true)}>
                <span>
                  <strong>Inscription</strong>
                </span>
              </Link>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
              >
                <button
                  type="button"
                  className="crossbtn"
                  title="close modal"
                  onClick={() => setModalIsOpen(false)}
                >
                  ✕
                </button>
                <ModalSignup />
              </Modal>
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
}

export default GuestTopNav;
