import React from 'react';
import { Searchbar } from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem'
import { Modal } from './Modal/Modal';

export class App extends React.Component {
	state = {
		searchQuery: "",
		showModal: false,
		modalImg: '',
		tags: ''
	}

	handleFormSubmit = searchQuery => {
		this.setState({ searchQuery })
	}

	handleModalcontent = data => {
		this.setState(state => ({
			modalImg: data.largeImageURL,
			tags: data.tags
		}))
	}

	toggleModal = () => {
		this.setState(state => ({
			showModal: !state.showModal,
		}))
	}

	render() {
		const { searchQuery, showModal, modalImg, tags } = this.state;
		return (
			<div>
				{showModal && (<Modal onClose={this.toggleModal} >
					<img src={modalImg} alt={tags} />
				</Modal>)}
				<Searchbar onSubmit={this.handleFormSubmit} />
				{searchQuery && (<ImageGallery><ImageGalleryItem searchQuery={searchQuery} onClick={this.toggleModal} handleModalcontent={this.handleModalcontent} /></ImageGallery>)}
			</div>
		)
	}
};
