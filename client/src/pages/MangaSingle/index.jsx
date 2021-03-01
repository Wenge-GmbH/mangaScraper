import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import * as MangaService from 'services/manga-service';

const MangaSingle = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery(
    ['manga', { id }],
    async () => await MangaService.getManga(id)
  );

  console.log(data);

  return (
    <React.Fragment>
      <Helmet>
        <title>{data && data?.title}</title>
      </Helmet>
      <MangaDetails manga={data} />

      <ChapterList id={id} />
    </React.Fragment>
  );
};

const MangaDetails = ({ manga, props }) => {
  if (!manga) return null;
  return (
    <div {...props} className="container row">
      <div className="col-md-5 ">
        <img src={manga.mainCover} />
      </div>
      <div className="col-md-7">
        <h3>{manga.title}</h3>
        <div className="row">
          {manga?.tags.map((num) => (
            <span key={num}>{` ${num}- `}</span>
          ))}
        </div>
        <p style={{ whiteSpace: 'pre-wrap' }}>{manga.description}</p>
        <br />
      </div>
    </div>
  );
};

const ChapterList = ({ id }) => {
  const { isLoading, data } = useQuery(['manga-chapters', { id }], async () => {
    if (!id) throw 'no id :(';
    return await MangaService.getMangaChapters(id);
  });
  console.log(data);
  if (!data) return null;
  return (
    <div className="container">
      {data?.chapters
        .filter(({ language }) => language === 'gb')
        .map(({ chapter, title, timestamp, ...mangaChapter }, i) => (
          <Link to={`/manga/${id}/${mangaChapter.id}`} key={i} className="row card">
            <span style={{ padding: '0 6px' }}>{chapter}</span>
            <h5 className="col-md-4 nop">{title}</h5>
            <span> {new Date(timestamp * 1000).getFullYear()}</span>
          </Link>
        ))}
    </div>
  );
};

export default MangaSingle;
