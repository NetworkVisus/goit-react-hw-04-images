import * as Styled from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ source, alternative, id, handleModal }) => {
  return (
    <Styled.Item onClick={handleModal}>
      <Styled.Image src={source} alt={alternative} id={id} />
    </Styled.Item>
  );
};
