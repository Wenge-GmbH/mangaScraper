import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import * as MangaService from 'services/manga-service';

const MangaChapter = () => {
  const { id, chapter_id } = useParams();
  const { isLoading, data } = useQuery(
    ['chapter', { id: chapter_id }],
    async () => await MangaService.getChapter(chapter_id),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  // console.log(data);
  useEffect(() => {
    // const img = new Image();
    // img.onload = () => {
    //   console.log('loaded');
    // };
    // img.crossOrigin = 'Anonymous';
    // img.referrerPolicy = 'norefferer noopener';
    // img.onerror = (e) => {
    //   console.log(e);
    // };
    // img.src =
    //   '/proxy?url=https://rfzartpqhm2ae.jnzfrrt2z1ney.mangadex.network:44300/aG1UlqH8NtO2NGDxeqyjZzRCVtReM2VIbsdpFvZ-tgxhfBHkC-6Kgoy8V0KHQ3045HUfeTw3-kDJ7_PRWWPUW0GUhMze5U6tuppK1yQCum0eqRMG-wvgYgP701NgvhgbkG1FF01xOTfjlBW-XYPjIJbj5VQrsMtECnEO4VPFYzsev65RyRTaGfHQXTJml1uHMoLUxF6sxknclY28VT0OR8kly3jHWg/data/373ddfb4bfb9eb6ca782fbb671d6ab4d/1-9e65b5bdfbb9074f3983f30f10b38c1a5caf6374c75b06ce9c0dccef5eb637ba.png';
  }, []);
  return (
    <React.Fragment>
      <Helmet>{/* <title>{data && data?.title}</title> */}</Helmet>
      <div className="container">
        {data?.pages.map((src) => (
          <img src={`/proxy?url=${src.replace('s1.', 's2.')}`} loading="lazy" />
        ))}
      </div>
    </React.Fragment>
  );
};

export default MangaChapter;
