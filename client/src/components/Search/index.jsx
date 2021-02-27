import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from 'redux/search';
import { AwesomeIcon } from 'ui/components/AwesomeIcon';
import { Link } from 'react-router-dom';

const IconButton = styled(AwesomeIcon)`
  cursor: pointer;
`;

export const SearchButton = () => {
  const dispatch = useDispatch();
  const { active } = useSelector(({ search }) => search);

  return (
    <Link to="/search">
      <IconButton icon="search" onClick={() => dispatch(setActive(!active))}>
        hi
      </IconButton>
    </Link>
  );
};
