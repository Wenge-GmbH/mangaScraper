import React, { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { useNovels } from 'redux/novel';
import { Link } from 'react-router-dom';
import { useFetch } from 'utils';

const Dashboard = () => {
  const { slug, ...params } = useParams();
  const actualChapter = useMemo(
    () => parseInt(params.chapter.replace('chapter-', '')),
    [params.chapter]
  );
  const { isLoading, data, isError } = useFetch(
    async () => await fetchOneChapter({ slug, chapter: actualChapter }),
    actualChapter
  );
  const { fetchOneChapter } = useNovels();

  if (isLoading || isError) return null;
  // if (!novel.chapters) return null;
  console.log(data);
  const { title, chapter, chapterCount } = data;
  console.log(actualChapter, chapterCount);
  return (
    <React.Fragment>
      <Helmet>
        <html lang="de" />
        <title>Home | </title>
        <meta charset="utf-8" />
        <meta name="author" content="Synelution GmbH Klagenfurt" />
        <meta name="description" content="" />
      </Helmet>
      <div className="container-middle">
        <Link to={`/novel/${slug}`}>
          <h2>{title}</h2>
        </Link>
        <h3>
          {`Chapter ${chapter.chapter}: `}
          {chapter.title}
        </h3>
      </div>
      <div className="container-middle">
        {chapter.content.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
        {chapterCount > actualChapter ? (
          <Link className="btn" to={`/novel/${slug}/chapter-${actualChapter + 1}`}>
            next
          </Link>
        ) : (
          <button className="btn" disabled>
            next
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
