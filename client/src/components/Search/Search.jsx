import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { SearchForm } from './SearchForm';

const SearchBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10rem 5rem;
  transition: 1s cubic-bezier(0.2, 1, 0.3, 1);
  transform: ${({ $active }) => ($active ? 'translateY(0)' : 'translateY(150px)')};
  opacity: ${({ $active }) => ($active ? '1' : 0)};
`;

const HistoryPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ color }) => color || '#fff'};
  transform: translate3d(0, 100vh, ${({ size }) => size || -200}px);
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.05);
`;

export const Search = ({ children }) => {
  const { active } = useSelector(({ search }) => search);
  // const { isLoading, error, data, isFetching } = useQuery('search', {});

  useEffect(() => {
    if (active) document.body.classList.add('search');
    else document.body.classList.remove('search');
  }, [active]);

  return (
    <>
      <SearchBox className="row justify-center" $active={active}>
        <SearchForm />
      </SearchBox>
      <HistoryPage size={-300} />
      <HistoryPage size={-250} />
      <HistoryPage size={-200} />

      <div>{children}</div>
    </>
  );
};
