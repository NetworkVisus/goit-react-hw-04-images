import * as Styled from './Searchbar.styled';

export const Searchbar = ({ handleSubmit, isSearch }) => {
  return (
    <Styled.Header>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Button type="submit" disabled={isSearch}>
          <Styled.BtnIcon />
          <Styled.Span></Styled.Span>
        </Styled.Button>

        <Styled.Input
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          disabled={isSearch}
        ></Styled.Input>
      </Styled.Form>
    </Styled.Header>
  );
};
