import React from 'react';
import { Searchbar } from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem'

export class App extends React.Component {
	state = {
		searchQuery: "",
	}

	handleFormSubmit = searchQuery => {
		this.setState({ searchQuery })
	}

	render() {
		const { searchQuery } = this.state;

		return (
			<div>
				<Searchbar onSubmit={this.handleFormSubmit} />
				{searchQuery && (<ImageGallery><ImageGalleryItem searchQuery={searchQuery} /></ImageGallery>)}
			</div>
		)
	}
};
