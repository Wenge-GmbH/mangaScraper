import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchManga } from 'redux/search';
import styled from 'styled-components';

const SearchInput = styled.input`
  border-bottom: 6px solid #ebebeb;
  font-size: 7vw;
  background-color: transparent;
  width: 75%;
  max-width: 900px;
`;

export const SearchForm = () => {
  const { active, pending } = useSelector(({ search }) => search);
  const ref = useRef();
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (active) ref.current.focus();
  }, [active]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    if (!title) return;
    dispatch(searchManga({ title }));
  };

  return (
    <form className="row justify-center" onSubmit={handleSubmit}>
      <SearchInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ref={ref}
        placeholder="search"
        autoCorrect="off"
      />
      <p>{pending ? 'loading...' : ''}</p>
    </form>
  );
};
