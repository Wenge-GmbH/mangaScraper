import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useLocomotive } from 'components/animators';
import { staticDataContext } from 'config';

const Impressum = () => {
  useLocomotive({
    el: { current: document.querySelector('.main-content') },
  });
  const { email, tel, companyName } = useContext(staticDataContext);

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
