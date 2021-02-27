import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const MangaCard = ({ id, title, image_url, views, rating }) => {
  const ref = useRef();
  const [img, setImg] = useState(image_url.replace('.large', ''));

  // needed to check if large image has another file type
  useEffect(() => {
    if (!ref.current) return;
    ref.current.onerror = (error) => {
      console.log('error');
      if (img.search('.jpg') !== -1) return setImg(img.replace('.jpg', '.jpeg'));
      if (img.search('.jpeg') !== -1) return setImg(img.replace('.jpeg', '.png'));
    };
  }, [img]);

  return (
    <div className="col-md-3" key={id}>
      <img ref={ref} src={img} />
      <h5>{title}</h5>
      <p>{views}</p>
      <p>
        {rating.value} / {rating.votes}
      </p>
    </div>
  );
};

export default SearchPage;
