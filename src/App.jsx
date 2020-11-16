import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BreakpointProvider } from 'react-socks';

import reducer from './reducer';
import { AuthContext } from './context/auth';

import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/nav/BottomNav';

import Places from './components/pages/Places';
import Place from './components/pages/Place';
import Reserver from './components/pages/Reserver';
import Booking from './components/pages/Booking';
import Bookings from './components/pages/Bookings';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Enregistres from './components/pages/Enregistres';
import Messages from './components/pages/Messages';
import Profil from './components/pages/Profil';

import './App.scss';

const API = process.env.REACT_APP_API;

function App() {
  const initialState = {
    isAuthenticated: false,
    token: localStorage.getItem('token'),
    user: null,
    isFetching: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const res = await axios.get(`${API}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.status === 200) {
            dispatch({
              type: 'LOAD_USER',
              token,
            });
          }
        } catch (error) {
          dispatch({
            type: 'LOGOUT',
          });
        }
      } else {
        dispatch({
          type: 'NO_USER',
        });
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <BreakpointProvider>
        <div className="App">
          <Header />
          <Router>
            <>
              <BottomNav />
              <Switch>
                <Route exact path="/" component={Places} />
                <Route exact path="/rooms/:id" component={Place} />
                <Route exact path="/rooms/:id/reserver" component={Reserver} />
                <Route exact path="/rooms/:id/booking" component={Booking} />
                <Route exact path="/bookings" component={Bookings} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/wishlists" component={Enregistres} />
                <Route exact path="/inbox" component={Messages} />
                <Route exact path="/account-settings" component={Profil} />
              </Switch>
            </>
          </Router>

          <Footer />
        </div>
      </BreakpointProvider>
    </AuthContext.Provider>
  );
}

export default App;
