import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { SearchBar } from 'components/SearchBar/SearchBar';
import React, { Component } from 'react';
import { requestImg } from 'services/api';

export class AppHTTPRequests extends Component {
  state = {
    images: null,
    status: 'init',
    error: null,
    showModal: false,
    modalImg: null,
  };

  fetchImg = async () => {
    try {
      const images = await requestImg();
      const filteredData = images.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        })
      );
      this.setState({ images: filteredData });
    } catch (error) {}
  };

  componentDidMount() {
    this.fetchImg();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.images !== this.state.images) {
    }
  }

  onCloseModal = () => {
    this.setState(() => ({
      showModal: false,
      modalImg: null,
    }));
  };

  handleImageClick = id => {
    const largeImg = this.state.images.filter(image => image.id === id)[0]
      .largeImageURL;
    this.setState(({ showModal }) => ({ showModal: true, modalImg: largeImg }));
  };
  render() {
    return (
      <div>
        <SearchBar />
        <ImageGallery
          state={this.state}
          handleImageClick={this.handleImageClick}
        />
        {this.state.showModal && (
          <Modal onClose={this.onCloseModal} largeImg={this.state.modalImg} />
        )}
      </div>
    );
  }
}
