import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ state, handleImageClick }) => {
  return (
    <div>
      <ul className={css.ImageGallery}>
        {state.images &&
          state.images.map(image => (
            <ImageGalleryItem
              state={image}
              handleImageClick={() => handleImageClick(image.id)}
            />
          ))}
      </ul>
    </div>
  );
};
