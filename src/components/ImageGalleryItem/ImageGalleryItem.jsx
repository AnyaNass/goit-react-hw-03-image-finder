import React from 'react';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled'



export class ImageGalleryItem extends React.Component {

	handleClick = e => {
		const targetImg = this.props.gallery.hits.find(item => item.id === Number(e.currentTarget.id))

		this.props.handleModalcontent(targetImg)
		this.props.onClick();
	}

	render() {
		const { gallery } = this.props;

		return gallery.hits.map(item => {
			return <GalleryItem GalleryItem onClick={this.handleClick} key={item.id} id={item.id} >
				<GalleryImg src={item.webformatURL} alt={item.tags} />
			</GalleryItem>
		})
	}
}
