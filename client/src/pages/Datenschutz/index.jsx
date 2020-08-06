import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';

const Datenschutz = () => {
  return (
    <>
      <Helmet>
        <html lang="de" />
        <title>Datenschutz</title>
        <meta charset="utf-8" />
        <meta name="author" content="Synelution GmbH Klagenfurt" />
        <meta
          name="description"
          content="Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003). In dieser "
        />
      </Helmet>
      <section>
        <div className="container-middle-big"></div>
      </section>
    </>
  );
};

export default Datenschutz;
