import React, { useContext, useState } from 'react';

import { AuthContext } from '../../context/auth';

import LoggedTopNav from './LoggedTopNav';
import GuestTopNav from './GuestTopNav';

const TopNavbar = () => {
  const { state: authState } = useContext(AuthContext);
  const [openUser, setOpenUser] = useState(false);
  const [openCurLang, setOpenCurLang] = useState(false);

  if (authState.isAuthenticated) {
    return (
      <>
        <LoggedTopNav
          openUser={openUser}
          setOpenUser={setOpenUser}
          openCurLang={openCurLang}
          setOpenCurLang={setOpenCurLang}
        />
      </>
    );
  }
  return (
    <>
      <GuestTopNav
        openUser={openUser}
        setOpenUser={setOpenUser}
        openCurLang={openCurLang}
        setOpenCurLang={setOpenCurLang}
      />
    </>
  );
};

export default TopNavbar;
