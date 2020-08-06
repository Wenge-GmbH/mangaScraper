import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { staticDataContext, legalLinks, mainLinks } from 'config';

import logo from 'assets/logo.svg';

export const Footer = () => {
  const { address, email, tel, companyName } = useContext(staticDataContext);
  return (
    <>
      <footer className="footer col">
        <div className="footer__middle container row nop">
          <div className="text-col col-md-4 col-ml-4">
            {address.map((text, i) => (
              <div key={i} className="row nowrap f-icon flex-align-center">
                <span className="">{text}</span>
              </div>
            ))}
            {[email, tel].map(({ text, link }, i) => (
              <div key={i} className="row nowrap f-icon flex-align-center">
                <a
                  style={{ textDecoration: 'underline' }}
                  href={link}
                  className="simple-hover"
                >
                  {text}
                </a>
              </div>
            ))}
          </div>

          <div className="col-md-4 col-ml-4 nopt column flex-align-center justify-top">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="text-col col-md-4 col-ml-4 column flex-align-start align-right">
            {mainLinks.map(({ link, text }) => (
              <Link key={link} to={link}>
                <span className="simple-hover">{text}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="footer__bottom  container fw align-center row justify-space-between">
          <span>
            © COPYRIGHT {new Date().getFullYear()} - {companyName}
          </span>
          <div className="row col nop justify-end">
            {legalLinks.map(({ link, text, normalLink }) =>
              !normalLink ? (
                <Link key={link} className="text-trenner__hori" to={link}>
                  <span className="simple-hover">{text}</span>
                </Link>
              ) : (
                <a
                  className="simple-hover"
                  key={text}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link}
                >
                  {text}
                </a>
              )
            )}
          </div>
        </div>
      </footer>
    </>
  );
};
