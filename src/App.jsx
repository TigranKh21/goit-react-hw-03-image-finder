import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { Component } from 'react';
import { requestImg, requestNextPage } from 'services/api';
import { ThreeCircles } from 'react-loader-spinner';
import css from './index.css';

export class App extends Component {
  state = {
    images: null,
    status: null,
    error: null,
    showModal: false,
    modalImg: null,
    query: '',
    page: 1,
    pages: '',
  };

  componentDidMount() {
    this.setState({ status: 'pending' });
    this.fetchImg();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ page: 1 });
      this.fetchImg();
    }
  }

  fetchImg = async () => {
    try {
      const images = await requestImg(this.state.query);
      const pages = Math.ceil(images.total / 12);
      const filteredData = images.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        })
      );
      this.setState({
        images: filteredData,
        status: 'success',
        pages: pages,
      });
    } catch (error) {
      this.setState({ error: error.message, status: 'error' });
    }
  };

  fetchLoadMore = async () => {
    try {
      const images = await requestNextPage(this.state.query, this.state.page);
      const filteredData = images.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        })
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...filteredData],
        status: 'success',
      }));
    } catch (error) {
      this.setState({ error: error.message, status: 'error' });
    }
  };

  onCloseModal = () => {
    this.setState(() => ({
      showModal: false,
      modalImg: null,
    }));
  };

  handleImageClick = id => {
    const largeImg = this.state.images.filter(image => image.id === id)[0]
      .largeImageURL;
    this.setState({ showModal: true, modalImg: largeImg });
  };

  handleSearchQuery = searchValue => {
    this.setState({ query: searchValue });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.fetchLoadMore();
      }
    );
  };

  checkLastPage = () => {
    return this.state.page === this.state.pages;
  };

  render() {
    return (
      <div className={css.app}>
        {this.state.status === 'pending' && <ThreeCircles />}
        <SearchBar handleSearchQuery={this.handleSearchQuery} />
        <ImageGallery
          state={this.state}
          handleImageClick={this.handleImageClick}
        />
        {this.state.showModal && (
          <Modal onClose={this.onCloseModal} largeImg={this.state.modalImg} />
        )}
        {this.state.images && (
          <Button
            checkLastPage={this.checkLastPage()}
            onClick={this.handleLoadMore}
          />
        )}
      </div>
    );
  }
}
