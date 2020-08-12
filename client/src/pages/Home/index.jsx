import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from 'services/auth';

const Home = () => {
  const authentication = useAuth();
  return (
    <React.Fragment>
      <Helmet>
        <html lang="de" />
        <title>Home | </title>
        <meta charset="utf-8" />
        <meta name="author" content="Synelution GmbH Klagenfurt" />
        <meta name="description" content="" />
      </Helmet>

      {/*how to use apsec ratio */}
      <div className="container row justify-center">
        <h1 className="fw align-center">novels coming soon</h1>
        <button className="btn" onClick={() => authentication.logout()}>
          logout
        </button>
      </div>
    </React.Fragment>
  );
};

export default Home;
