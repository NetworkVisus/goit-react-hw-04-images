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
  const [perPage, setPerPage] = useState(20);
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
        setImages(prev => [...prev, ...hits]);
      })
      .catch(error => {
        setIsGalleryLoaded(false);
        setErrorMsg(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    if (!searchQuery) return;
    handleGallery();
  }, [searchQuery]);

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

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

  const handleSubmit = e => {
    e.preventDefault();
    const searchQueryValue = e.target.elements.searchQuery.value.trim();
    if (searchQueryValue === '') {
      alert(
        "Seems like, you haven't entered anything, please, write your query"
      );
      return;
    }
    setSearchQuery(searchQueryValue);
    setIsGalleryLoaded(false);
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

/*
const { Component } = require('react');

export class App extends Component {
  state = {
    searchQuery: '',
    isGalleryLoaded: false,
    images: [],
    errorMsg: '',
    perPage: 20,
    currentPage: 1,
    totalPages: 0,
    isLoading: false,
    chosenImage: null,
    isShowModal: false,
    isSearch: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.handleGallery();
    }
    if (prevState.currentPage !== this.state.currentPage) {
      imagesApi
        .getImagesByQuery(this.state.searchQuery, _, this.state.currentPage)
        .then(({ hits }) => {
          this.setState(prev => ({
            isLoading: true,
            images: [...prev.images, ...hits],
          }));
        })
        .catch(error => {
          this.setState({ isGalleryLoaded: false, errorMsg: error });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  



  
 =
*/
/*{this.state.isGalleryLoaded && this.state.imagesArray.}*/
