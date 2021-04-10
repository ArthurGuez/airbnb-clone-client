import React, { useEffect } from 'react';
import { Breakpoint } from 'react-socks';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { loadPlaces, selectData } from '../../Redux/slices/placeSlice';

import PlaceItem from '../PlaceItem';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  const places = useSelector(selectData);

  return (
    <>
      <Breakpoint small down>
        <div className="places__intro">
          <h1>Logements : France </h1>
          <p>Classement par ordre de pertinence</p>
        </div>
        <div className="places">
          {places.map((place) => (
            <PlaceItem key={place.id} place={place} />
          ))}
        </div>
      </Breakpoint>
      <Breakpoint medium only>
        <div className="places__intro">
          <h1>Logements : France </h1>
          <p>Classement par ordre de pertinence</p>
        </div>
        <div className="places">
          {places.map((place) => (
            <PlaceItem key={place.id} place={place} />
          ))}
        </div>
      </Breakpoint>
      <Breakpoint large up>
        <div className="places__intro">
          <h1>Logements : France </h1>
          <p>Classement par ordre de pertinence</p>
        </div>
        <div className="places">
          {places.map((place) => (
            <PlaceItem key={place.id} place={place} />
          ))}
        </div>
      </Breakpoint>
    </>
  );
};

export default Home;
