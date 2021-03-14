import React, { useState } from 'react';

// Redux
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../../Redux/slices/authenticationSlice';

import LoggedTopNav from './LoggedTopNav';
import GuestTopNav from './GuestTopNav';

const TopNavbar = () => {
  const authStatus = useSelector(selectAuthStatus);
  const [openUser, setOpenUser] = useState(false);
  const [openCurLang, setOpenCurLang] = useState(false);

  if (authStatus.isAuthenticated) {
    return (
      <LoggedTopNav
        openUser={openUser}
        setOpenUser={setOpenUser}
        openCurLang={openCurLang}
        setOpenCurLang={setOpenCurLang}
      />
    );
  }
  return (
    <GuestTopNav
      openUser={openUser}
      setOpenUser={setOpenUser}
      openCurLang={openCurLang}
      setOpenCurLang={setOpenCurLang}
    />
  );
};

export default TopNavbar;
