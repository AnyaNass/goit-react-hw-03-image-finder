import React from 'react';
import { ThreeDots } from 'react-loader-spinner'
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled'

export class ImageGalleryItem extends React.Component {
	state = {
		gallery: null,
		loading: false,
	}

	async componentDidMount() {
		this.setState({ loading: true })
		const response = await fetch(`https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=29841815-11a861cc71d343152543274bc&image_type=photo&orientation=horizontal&per_page=12`);
		const gallery = await response.json();

		this.setState({ gallery, loading: false });
	}

	async componentDidUpdate(prevProps, prevState) {
		if (prevProps.searchQuery !== this.props.searchQuery) {
			this.setState({ loading: true })

			const response = await fetch(`https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=29841815-11a861cc71d343152543274bc&image_type=photo&orientation=horizontal&per_page=12`);
			const gallery = await response.json();

			this.setState({ gallery, loading: false });
		}
	}

	render() {
		const { gallery, loading } = this.state;
		return (
			<>
				{loading && <ThreeDots />}
				{this.state.gallery && gallery.hits.map(item => {
					return <GalleryItem key={item.id}>
						<GalleryImg src={item.webformatURL} alt={item.tags} />
					</GalleryItem>
				})}
			</>
		)
	}
}

