import { GalleryList } from './ImageGallery.styled'
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'

export const ImageGallery = ({ gallery, ...otherProps }) => {
	return <GalleryList><ImageGalleryItem gallery={gallery} {...otherProps} /></GalleryList>
}

