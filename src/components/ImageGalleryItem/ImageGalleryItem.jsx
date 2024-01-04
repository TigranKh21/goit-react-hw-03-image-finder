import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ state, handleImageClick }) => {
  return (
    <li
      key={state.id}
      className={css.ImageGalleryItem}
      onClick={() => handleImageClick(state.id)}
    >
      <img
        src={state.webformatURL}
        alt={state.tags}
        large={state.largeImageURL}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};
