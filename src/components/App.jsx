import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import * as imagesApi from '../api/images';
import * as Styled from './App.styled';
import { useEffect, useState } from 'react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGalleryLoaded, setIsGalleryLoaded] = useState(false);
  const [images, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [chosenImage, setChosenImage] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (currentPage === 1) return;
    imagesApi
      .getImagesByQuery(searchQuery, undefined, currentPage)
      .then(({ hits }) => {
        setIsLoading(true);
        setImages(prevImages => [...prevImages, ...hits]);
      })
      .catch(error => {
        setIsGalleryLoaded(false);
        setErrorMsg(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, searchQuery]);

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!searchQuery) return;
    const handleGallery = async () => {
      setIsLoading(true);
      setIsSearch(true);
      await imagesApi
        .getImagesByQuery(searchQuery)
        .then(({ hits, totalHits }) => {
          if (totalHits !== 0) {
            setImages(hits);
            setIsGalleryLoaded(true);
            setErrorMsg('');
            setTotalPages(Math.ceil(totalHits / hits.length));
          } else {
            alert(
              "Unfortunately, we weren't able to find something related to your search query"
            );
            setIsGalleryLoaded(false);
          }
        })
        .catch(error => {
          setIsGalleryLoaded(false);
          setErrorMsg(error);
        })
        .finally(() => {
          setIsLoading(false);
          setIsSearch(false);
        });
    };
    handleGallery();
  }, [searchQuery]);

  const handleSubmit = e => {
    e.preventDefault();
    const searchQueryValue = e.target.elements.searchQuery.value.trim();
    if (searchQuery === searchQueryValue) {
      alert('Try to change your query');
      return;
    }
    if (searchQueryValue === '') {
      alert(
        "Seems like, you haven't entered anything, please, write your query"
      );
      return;
    }
    setSearchQuery(searchQueryValue);
    setIsGalleryLoaded(false);
    setCurrentPage(1);
  };

  const handleModal = e => {
    const currentId = Number(e.target.id);
    const chosenImageTmp = images.filter(el => el.id === currentId);
    setIsShowModal(true);
    setChosenImage(chosenImageTmp[0]);
  };

  const handleModalClose = () => {
    setIsShowModal(false);
    setChosenImage(null);
  };

  console.log(errorMsg); //avoiding no-unused value of the gitHub build
  return (
    <Styled.Div>
      <Searchbar handleSubmit={handleSubmit} isSearch={isSearch}></Searchbar>
      {isLoading && <Loader isLoading={isLoading} />}
      {isGalleryLoaded && (
        <ImageGallery imagesArr={images} handleModal={handleModal} />
      )}
      {totalPages > currentPage && isGalleryLoaded && !isLoading && (
        <Button handleLoadMore={handleLoadMore} />
      )}
      {isShowModal && (
        <Modal image={chosenImage} modalClose={handleModalClose} />
      )}
    </Styled.Div>
  );
}
