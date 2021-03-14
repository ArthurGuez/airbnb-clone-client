import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

// Redux
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../../Redux/slices/authenticationSlice';

import photoPlace from '../../assets/images/photoPlace.jpg';
import { ReactComponent as FlashDroit } from '../../assets/images/icons/flash-droit.svg';

const API = process.env.REACT_APP_API;

const Bookings = () => {
  const authStatus = useSelector(selectAuthStatus);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const getBookings = await axios(`${API}/bookings`, {
        headers: { Authorization: `Bearer ${authStatus.token}` },
      });

      setBookings(getBookings.data);
    };
    fetchBookings();
  }, [authStatus]);
  return (
    <>
      <div className="bookings">
        <h2>Voyages</h2>
        <p>Tous vos bookings !!!!</p>
        <div>
          {bookings.map((booking) => (
            <div key={booking.id}>
              <div className="bookings__booking">
                <img
                  className="bookings__booking__image"
                  src={booking.Place.image}
                  alt="appartement"
                />
                <div className="bookings__booking__info">
                  <div className="bookings__booking__info__text-color">
                    <span>
                      <Moment format="D MMM">{booking.check_in}</Moment>
                    </span>
                    <span> - </span>
                    <span>
                      <Moment format="D MMM">{booking.check_out}</Moment>
                    </span>
                  </div>
                  <h2>{booking.Place.City.name}</h2>
                  <div className="bookings__booking__info__info-link">
                    <div className="bookings__booking__info__info-link__left">
                      <img
                        className="bookings__booking__info__info-link__left__image-small"
                        src={booking.Place.image}
                        alt="appartement"
                      />
                      <p className="bookings__booking__info__info-link__left__name">
                        {booking.Place.name}
                      </p>
                    </div>
                    <FlashDroit className="bookings__booking__info__info-link_right" />
                  </div>
                </div>
                <hr />
                <p className="bookings__booking__info__plus">
                  <strong>Affichez plus de projets de voyage</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Bookings;
