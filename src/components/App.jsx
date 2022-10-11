import React from 'react';
import { Searchbar } from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Modal } from './Modal/Modal';
import * as API from './services/api'
import { ErrorMessage } from './ErrorMessage/ErrorMessage'
import { ThreeDots } from 'react-loader-spinner'

export class App extends React.Component {
	state = {
		searchQuery: '',
		gallery: null,
		page: 1,
		error: false,
		loading: false,
		showModal: false,
		modalImg: '',
		tags: '',
	}

	//  componentDidUpdate(prevProps, prevState) {

	// }

	handleFormSubmit = async searchQuery => {
		this.setState({ searchQuery, error: false, loading: true });
		try {
			const gallery = await API.getImages(searchQuery);
			if (gallery.total === 0) {
				throw new Error();
			}
			this.setState({ gallery, loading: false })
		}
		catch (error) {
			this.setState({ error: true, gallery: null, loading: false })
		}
	}

	toggleModal = () => {
		this.setState(state => ({
			showModal: !state.showModal,
		}))
	}

	handleModalcontent = data => {
		this.setState(state => ({
			modalImg: data.largeImageURL,
			tags: data.tags
		}))
	}

	loadMore = () => {
		this.setState(prevState => ({ page: prevState.page + 1 }))
	}

	render() {

		const { error, searchQuery, gallery, loading, showModal, modalImg, tags } = this.state;
		console.log(gallery);
		return (<>
			<Searchbar onSubmit={this.handleFormSubmit} />
			{showModal && (<Modal onClose={this.toggleModal} >
				<img src={modalImg} alt={tags} />
			</Modal>)}
			{error && <ErrorMessage message={`We haven't found anything for your search "${searchQuery}"`} />}
			{gallery && <ImageGallery gallery={gallery} onClick={this.toggleModal} handleModalcontent={this.handleModalcontent} />}
			{loading && <ThreeDots />}
			<button onClick={this.loadMore}>Load more</button>
		</>
		)
	}
}


