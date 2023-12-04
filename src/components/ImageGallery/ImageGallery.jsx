import * as Styled from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ imagesArr, handleModal }) => {
  return (
    <Styled.List>
      {imagesArr.map(el => (
        <ImageGalleryItem
          source={el.webformatURL}
          alternative={el.tags}
          key={el.id}
          id={el.id}
          handleModal={handleModal}
        />
      ))}
    </Styled.List>
  );
};
