import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Breakpoint } from 'react-socks';

// Redux
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../../Redux/slices/authenticationSlice';

import Reserver from './Reserver';

const API = process.env.REACT_APP_API;

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

const Place = () => {
  const authStatus = useSelector(selectAuthStatus);

  const { id } = useParams();

  const [place, setPlace] = useState('');

  const {
    name,
    city,
    max_guests: maxGuests,
    rooms,
    bathrooms,
    image,
    price_by_night: priceByNight,
  } = place;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchPlace = async () => {
      const res = await axios(`${API}/places/${id}`);
      setPlace(res.data);
      console.log(res.data);
    };
    fetchPlace();
  }, [id]);

  if (authStatus.isAuthenticated) {
    return (
      <>
        <Breakpoint small down>
          <div className="place__header">
            <Link to="/" style={{ textDecoration: 'none' }}>
              &#8249; Logements • Airbnb
            </Link>
          </div>
          <div className="place__container">
            <div className="place__container-images">
              <img className="place__container-image" src={image} alt="appartement" />
            </div>
            <div className="place__container-info">
              <h1>{name}</h1>
              <p className="place__container-info-city">{city}</p>
              <p className="place__container-info-moreinfos">
                {maxGuests} pers. max ∙ {rooms} chambres ∙ {bathrooms} salles de bain
              </p>
              <p className="container-info-city-night"> {priceByNight}€/nuit </p>
              <p className="container-info-city-month"> {priceByNight * 30}€ pour un mois </p>
              <p className="place__container-info-more">
                C&apos;est une perle rare. Les réservations sont fréquentes !
              </p>
            </div>
          </div>
          <div className="place__container-book">
            <Link to={`/rooms/${id}/reserver`}>
              <button type="button" className="place__container-book-button">
                Réserver
              </button>
            </Link>
          </div>
        </Breakpoint>
        <Breakpoint medium up>
          <div className="place__container">
            <div className="place__container-images">
              <img className="place__container-image" src={image} alt="appartement" />
            </div>
            <div className="place__container-info">
              <h1>{name}</h1>
              <p className="place__container-info-city">{city}</p>
              <p className="place__container-info-moreinfos">
                {' '}
                {maxGuests} pers. max ∙ {rooms} chambres ∙ {bathrooms} salles de bain
              </p>
              <p className="container-info-city-night"> {priceByNight}€/nuit </p>
              <p className="container-info-city-month"> {priceByNight * 30}€ pour un mois </p>
              <p className="place__container-info-more">
                C&apos;est une perle rare. Les réservations sont fréquentes !
              </p>
              <button
                type="button"
                onClick={() => setModalIsOpen(true)}
                className="place__container-book-button"
              >
                Réserver
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
              >
                <Reserver />
              </Modal>
            </div>
          </div>
        </Breakpoint>
      </>
    );
  }

  return (
    <>
      <Breakpoint small down>
        <div className="place__header">
          <Link to="/" style={{ textDecoration: 'none' }}>
            &#8249; Logements • Airbnb
          </Link>
        </div>
        <div className="place__container">
          <div className="place__container-images">
            <img className="place__container-image" src={image} alt="appartement" />
          </div>
          <div className="place__container-info">
            <h1>{name}</h1>
            <p className="place__container-info-city">{city}</p>
            <p className="place__container-info-moreinfos">
              {maxGuests} pers. max ∙ {rooms} chambres ∙ {bathrooms} salles de bain
            </p>
            <p className="container-info-city-night"> {priceByNight}€/nuit </p>
            <p className="container-info-city-month"> {priceByNight * 30}€ pour un mois </p>
            <p className="place__container-info-more">
              C&apos;est une perle rare. Les réservations sont fréquentes !
            </p>
          </div>
        </div>
        <div className="place__container-book">
          <Link to="/login">
            <button type="button" className="place__container-book-button">
              Réserver
            </button>
          </Link>
        </div>
      </Breakpoint>
      <Breakpoint medium up>
        <div className="place__container">
          <div className="place__container-images">
            <img className="place__container-image" src={image} alt="appartement" />
          </div>
          <div className="place__container-info">
            <h1>{name}</h1>
            <p className="place__container-info-city">{city}</p>
            <p className="place__container-info-moreinfos">
              {' '}
              {maxGuests} pers. max ∙ {rooms} chambres ∙ {bathrooms} salles de bain
            </p>
            <p className="container-info-city-night"> {priceByNight}€/nuit </p>
            <p className="container-info-city-month"> {priceByNight * 30}€ pour un mois </p>
            <p className="place__container-info-more">
              C&apos;est une perle rare. Les réservations sont fréquentes !
            </p>
            <Link to="/login">
              <button type="button" className="place__container-book-button">
                Réserver
              </button>
            </Link>
          </div>
        </div>
      </Breakpoint>
    </>
  );
};

export default Place;
