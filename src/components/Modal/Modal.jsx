import * as Styled from './Modal.styled';
import { useEffect } from 'react';

export const Modal = ({ image, modalClose }) => {
  const backDropClose = e => {
    e.target === e.currentTarget && modalClose();
  };

  useEffect(() => {
    const handleEsc = e => {
      e.code === 'Escape' && modalClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [modalClose]); //I've added handleEsc to dependency, only because gitHub was complaining about it

  return (
    <Styled.Overlay onClick={backDropClose}>
      <Styled.Modal>
        <Styled.Image src={image.largeImageURL} alt={image.tags}></Styled.Image>
      </Styled.Modal>
    </Styled.Overlay>
  );
};
