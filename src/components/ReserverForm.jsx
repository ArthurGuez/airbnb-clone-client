import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Moment from 'moment';

// Redux
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../Redux/slices/authenticationSlice';

import useReserverForm from './useReserverForm';
import validate from './validators/ValidateReserver';

// SVGs
import { ReactComponent as FlashBas } from '../assets/images/icons/flash-bas.svg';
import { ReactComponent as Question } from '../assets/images/icons/question.svg';
import { ReactComponent as Croix } from '../assets/images/icons/croix.svg';

const API = process.env.REACT_APP_API;

const ReserverForm = (callback) => {
  const authStatus = useSelector(selectAuthStatus);

  const { id } = useParams();
  const [place, setPlace] = useState('');

  const { price_by_night: priceByNight } = place;
  const nuit = 1;
  const priceNuitTotal = priceByNight * nuit;
  const fraiseService = 0;
  const taxe = 0;
  const prixTotal = Math.round((priceNuitTotal + fraiseService - taxe) * 100) / 100;

  useEffect(() => {
    const fetchPlace = async () => {
      const res = await axios(`${API}/places/${id}`);
      setPlace(res.data);
    };
    fetchPlace();
  }, [id]);

  const { handleChange, handleSubmit, data, errors } = useReserverForm(submit, validate);

  function submit() {
    console.log('Submit est success');
  }

  const history = useHistory();
  async function submit() {
    try {
      const res = await axios.post(
        `${API}/bookings`,
        {
          place_id: id,
          check_in: `${Moment(data.check_in).utc().format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`,
          check_out: `${Moment(data.check_out).utc().format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`,
        },
        {
          headers: { Authorization: `Bearer ${authStatus.token}` },
        }
      );
      if (res) {
        console.log('Submitted Succesfully');
        console.log('resultats', res);
        history.push('/bookings');
      }
    } catch (err) {
      console.log('err from signup', err);
    }
  }
  return (
    <>
      <div className="reserver">
        <div>
          <Croix className="reserver__croix" />
        </div>
        <div>
          <form onSubmit={handleSubmit} noValidate>
            <h1>Votre voyage</h1>
            <div className="reserver__input">
              <div className="reserver__input__item__check-in">
                <h4>ARRIVÉE</h4>
                <input type="date" name="check_in" value={data.check_in} onChange={handleChange} />
                {errors.check_in && <p className="error">{errors.check_in}</p>}
              </div>
              <div className="reserver__input__item__check-out">
                <h4>DÉPART</h4>
                <input
                  type="date"
                  name="check_out"
                  value={data.check_out}
                  onChange={handleChange}
                />
                {errors.check_out && <p className="error">{errors.check_out}</p>}
              </div>
              <div className="reserver__input__item__numVoyageurs">
                <h4>VOYAGEURS</h4>
                <p>1 voyageur</p>
              </div>
            </div>
            <hr />
            <div className="reserver__annuler">
              <p>
                <strong>Conditions d&apos;annulation</strong>
              </p>
              <div className="reserver__annuler__non-rembourser">
                <p>
                  <span>Non remboursable </span>
                  {prixTotal}
                  <span>€</span>
                </p>
                <FlashBas className="bookings__booking__info__info-link_right" />
              </div>
            </div>
            <hr />
            <div className="reserver__prix">
              <div className="reserver__prix__item">
                <div className="reserver__prix__item__title">
                  <p>
                    {priceByNight}
                    <span> x </span>
                    {nuit}
                    <span> nuit</span>
                  </p>
                  <Question className="bookings__booking__info__info-link_right" />
                </div>
                <p>
                  {priceByNight}
                  <span>€</span>
                </p>
              </div>
              <div className="reserver__prix__item">
                <div className="reserver__prix__item__title">
                  <p>Frais de service</p>
                  <Question className="bookings__booking__info__info-link_right" />
                </div>
                <p>
                  {fraiseService}
                  <span>€</span>
                </p>
              </div>
              <div className="reserver__prix__item">
                <div className="reserver__prix__item__title">
                  <p>Taxes de séjour et frais</p>
                  <Question className="bookings__booking__info__info-link_right" />
                </div>
                <p>
                  {taxe}
                  <span>€</span>
                </p>
              </div>
            </div>
            <hr />
            <div className="reserver__prix">
              <div className="reserver__prix__item">
                <p>
                  <strong>Total</strong>
                </p>
                <p>
                  <strong>{prixTotal}</strong>
                  <span>€</span>
                </p>
              </div>
            </div>
            <div>
              <button className="reserver__button" type="submit">
                Réserver
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReserverForm;
