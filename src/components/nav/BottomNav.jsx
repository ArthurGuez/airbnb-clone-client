import React from 'react';

// Redux
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../../Redux/slices/authenticationSlice';

import { Breakpoint } from 'react-socks';

// Components
import LoggedBottomNav from './LoggedBottomNav';
import GuestBottomNav from './GuestBottomNav';

const BottomNav = () => {
  const authStatus = useSelector(selectAuthStatus);

  if (authStatus.isAuthenticated) {
    return (
      <nav className="nav-wrapper">
        <Breakpoint small down>
          <LoggedBottomNav />
        </Breakpoint>
        <Breakpoint medium up />
      </nav>
    );
  }
  return (
    <nav className="nav-wrapper">
      <Breakpoint small down>
        <GuestBottomNav />
      </Breakpoint>
      <Breakpoint medium up />
    </nav>
  );
};

export default BottomNav;
