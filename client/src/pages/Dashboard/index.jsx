import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from 'redux/auth';
import { useNovels } from 'redux/novel';
import { useSelector } from 'react-redux';

import { mapObject } from 'utils';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const authentication = useAuth();
  const novelActions = useNovels();
  const novels = useSelector(({ novels }) => novels);

  useEffect(() => {
    novelActions.fetch();
  }, []);
  console.log(novels);
  return (
    <React.Fragment>
      <Helmet>
        <html lang="de" />
        <title>Home | </title>
        <meta charset="utf-8" />
        <meta name="author" content="Synelution GmbH Klagenfurt" />
        <meta name="description" content="" />
      </Helmet>

      {novels && (
        <div className="row">
          {mapObject(
            novels,
            ({ title, coverImg, status, chapterCount, slug }, key) => (
              <Link to={'/novel/' + slug} className="col-ml-3" key={key}>
                <img src={coverImg} alt={title} />
                <h4>{title}</h4>
                <span>Status: {status}</span>
                <span>Chapter: {chapterCount}</span>
              </Link>
            )
          )}
        </div>
      )}

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

export default Dashboard;
