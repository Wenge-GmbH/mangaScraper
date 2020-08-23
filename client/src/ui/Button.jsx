import styled from 'styled-components';

export const Button = styled.button`
  font-size: 1rem;
  margin: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  text-transform: uppercase;

  /* Color the border and text with theme.main */
  color: ${(props) => props.theme.color.primary};
  border: 2px solid ${(props) => props.theme.color.primary};
`;
