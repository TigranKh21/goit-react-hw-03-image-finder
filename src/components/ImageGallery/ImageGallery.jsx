import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ state, handleImageClick }) => {
  return (
    <div className={css.ImageGalleryWrapper}>
      <ul className={css.ImageGallery}>
        {state.images &&
          state.images.map(image => (
            <ImageGalleryItem
              key={image.id}
              state={image}
              handleImageClick={() => handleImageClick(image.id)}
            />
          ))}
      </ul>
    </div>
  );
};
