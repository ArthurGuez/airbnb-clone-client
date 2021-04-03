import React from 'react';
import { Link } from 'react-router-dom';

const PlaceItem = ({ place }) => {
  const {
    id,
    name,
    city,
    max_guests: maxGuests,
    rooms,
    bathrooms,
    image,
    price_by_night: priceByNight,
  } = place;
  // console.log(props.place)

  // PlaceItem.propTypes = {
  //   id: PropTypes.number,
  // };

  return (
    <Link to={`/rooms/${id}`} style={{ textDecoration: 'none' }}>
      <div className="places__place">
        <img className="place__image" src={image} alt="appartement" />
        <p className="place__name">
          {' '}
          {name} ∙ {city}{' '}
        </p>
        <p className="place__moreinfos">
          {' '}
          {maxGuests} pers. max ∙ {rooms} chambres ∙ {bathrooms} salles de bain
        </p>
        <p className="place__price-night"> {priceByNight}€/nuit </p>
        <p className="place__price-month"> {priceByNight * 30}€ pour un mois </p>
      </div>
    </Link>
  );
};

export default PlaceItem;
