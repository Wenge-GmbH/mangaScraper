import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNovels } from 'redux/novel';
import { useSelector } from 'react-redux';

import { mapObject } from 'utils';
import { Link } from 'react-router-dom';

const Dashboard = () => {
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
              <Link to={'/novel/' + slug} className="col-ml-3 col-lg-2" key={key}>
                <img src={coverImg} alt={title} />
                <h4>{title}</h4>
                <span>Status: {status}</span>
                <span>Chapter: {chapterCount}</span>
              </Link>
            )
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
