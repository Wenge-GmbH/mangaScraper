import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActive } from 'redux/search';

const SearchPage = () => {
  const dispatch = useDispatch();
  const { manga } = useSelector(({ search }) => search);

  useEffect(() => {
    console.log('hi?');
    dispatch(setActive(true));

    return () => dispatch(setActive(false));
  }, []);

  if (!manga) return null;

  return (
    <div className="row">
      {manga?.titles.map((item) => (
        <MangaCard key={item.id} {...item} />
      ))}
    </div>
  );
};

const MangaCard = ({ id, title, image_url, views, rating, fullImg = false }) => {
  const ref = useRef();
  const [img, setImg] = useState(
    fullImg ? image_url.replace('.large', '') : image_url
  );

  // needed to check if large image has another file type
  useEffect(() => {
    if (!ref.current || !fullImg) return;
    ref.current.onerror = (error) => {
      console.log('error');
      if (img.search('.jpg') !== -1) return setImg(img.replace('.jpg', '.jpeg'));
      if (img.search('.jpeg') !== -1) return setImg(img.replace('.jpeg', '.png'));
    };
  }, [img, fullImg]);

  return (
    <Link to={`/manga/${id}`} className="col-md-3">
      <img ref={ref} src={img} />
      <h5>{title}</h5>
      <p>{views}</p>
      <p>ID: {id}</p>
      <p>
        {rating.value} / {rating.votes}
      </p>
    </Link>
  );
};

export default SearchPage;
