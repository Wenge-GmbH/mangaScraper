import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { staticDataContext, legalLinks, mainLinks } from 'config';

export const Footer = () => {
  const { address, email, tel, companyName } = useContext(staticDataContext);
  return (
    <>
      <footer className="footer col"></footer>
    </>
  );
};
