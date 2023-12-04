import * as Styled from './Button.styled';

export const Button = ({ handleLoadMore }) => {
  return <Styled.Button onClick={handleLoadMore}>Load more</Styled.Button>;
};
