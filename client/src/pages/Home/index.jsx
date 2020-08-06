import React from "react";
import { Helmet } from "react-helmet";

const Home = () => {
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
      <div style={{ "--aspect-ratio": "16/9" }}>
        <img
          alt="test"
          src={
            "https://images.unsplash.com/photo-1595866643379-6a06db265a99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
          }
        />
      </div>
    </React.Fragment>
  );
};

export default Home;
