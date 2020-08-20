import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNovels } from 'redux/novel';
import { arrayOf } from 'prop-types';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { fetchSingle } = useNovels();
  const { slug } = useParams();
  const novel = useSelector(({ novels }) => novels[slug]);
  console.log(novel);
  useEffect(() => {
    if (novel && novel.chapters) return;
    fetchSingle(slug);
  }, [novel]);

  if (!novel) return null;
  if (!novel.chapters) return null;
  return (
    <React.Fragment>
      <Helmet>
        <html lang="de" />
        <title>Home | </title>
        <meta charset="utf-8" />
        <meta name="author" content="Synelution GmbH Klagenfurt" />
        <meta name="description" content="" />
      </Helmet>

      <div className="container row">
        <div className="col-md-5">
          <img src={novel.coverImg} />
        </div>
        <div className="col-md-7">
          <h3>{novel.title}</h3>
          <div className="row">
            {novel.tags.map((text) => (
              <span key={text}>{` ${text}- `}</span>
            ))}
          </div>
          <br />
          <p style={{ whiteSpace: 'pre-wrap' }}>{novel.summary}</p>
        </div>
      </div>
      <div className="container">
        {novel.chapters.map(({ title, chapter, date }) => (
          <Link to={`${novel.slug}/${chapter}`} key={chapter} className="row card">
            <span style={{ padding: '0 6px' }}>{chapter}</span>
            <h5 className="col-md-4 nop">{title}</h5>
            <span> {date}</span>
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
