import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from 'services/auth';
import { useNovels } from './useNovels';
import { useSelector } from 'react-redux';

// callbakc parameter == (item, key)
const mapObject = (obj, callback) => {
  return Object.keys(obj).map((key) => callback(obj[key], key));
};

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
          {mapObject(novels, ({ title, coverImg, status, chapterCount }, key) => (
            <div className="col-ml-3" key={key}>
              <img src={coverImg} alt={title} />
              <h4>{title}</h4>
              <span>Status: {status}</span>
              <span>Chapter: {chapterCount}</span>
            </div>
          ))}
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
