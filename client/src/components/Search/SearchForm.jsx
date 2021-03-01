import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchManga } from 'redux/search';
import styled from 'styled-components';
import { tags, demographic } from './search-data';

const SearchInput = styled.input`
  border-bottom: 6px solid #ebebeb;
  font-size: 7vw;
  background-color: transparent;
  width: 100%;
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
    <form onSubmit={handleSubmit} style={{ maxWidth: '900px' }}>
      <div className="row justify-center">
        <SearchInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={ref}
          placeholder="search"
          autoCorrect="off"
        />
      </div>
      <div className="row">
        <p>Demographic: </p>
        {demographic.map(({ label, value }) => (
          <div>
            <label>
              <input type="checkbox" value={value} />
              {label}
            </label>
          </div>
        ))}
      </div>

      <div>
        <p>Tags include/exclude</p>
      </div>

      <p className="fw">{pending ? 'loading...' : ''}</p>
    </form>
  );
};
