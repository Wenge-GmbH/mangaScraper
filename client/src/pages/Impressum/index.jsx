import React from 'react';
import { Helmet } from 'react-helmet';

const Impressum = () => {
  return (
    <>
      <Helmet>
        <html lang="de" />
        <title>Imperssum</title>
        <meta charset="utf-8" />
        <meta name="author" content="Synelution GmbH Klagenfurt" />
        <meta name="description" content="" />
      </Helmet>
      <section>
        <div className="container-middle-big">{/* {copy pasta here} */}</div>
      </section>
    </>
  );
};

export default Impressum;
