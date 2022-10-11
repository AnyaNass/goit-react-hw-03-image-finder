import React from 'react';
import { Searchbar } from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Modal } from './Modal/Modal';
import * as API from './services/api'
import { ErrorMessage } from './ErrorMessage/ErrorMessage'
import { ThreeDots } from 'react-loader-spinner'
import { LoadMoreBtn } from './Button/Button'

export class App extends React.Component {
	state = {
		searchQuery: '',
		gallery: [],
		page: 1,
		error: false,
		loading: false,
		loadMoreBtn: false,
		showModal: false,
		modalImg: '',
		tags: '',
	}

	async componentDidUpdate(prevProps, prevState) {
		if (prevState.page !== this.state.page) {
			try {
				const response = await API.getImages(this.state.searchQuery, this.state.page)

				if (response.total === 0) {
					throw new Error();
				}

				this.setState(prevState => ({ gallery: [...prevState.gallery, ...response.hits], loading: false, loadMoreBtn: true }))
			} catch (error) {
				this.setState({ error: true, gallery: [], loading: false })
			}
		}
	}

	handleFormSubmit = async searchQuery => {
		this.setState({ searchQuery, error: false, loading: true });
		try {
			const gallery = await API.getImages(searchQuery);
			if (gallery.total === 0) {
				throw new Error();
			}
			this.setState({ gallery: gallery.hits, loading: false, loadMoreBtn: true })
		}
		catch (error) {
			this.setState({ error: true, gallery: [], loading: false, loadMoreBtn: false })
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
		this.setState(prevState => ({ page: prevState.page + 1, loading: true, loadMoreBtn: false }))
	}

	render() {
		// console.log(this.state.page);
		const { error, searchQuery, gallery, loading, showModal, modalImg, tags, loadMoreBtn } = this.state;
		// console.log(gallery);
		return (<>
			<Searchbar onSubmit={this.handleFormSubmit} />
			{showModal && (<Modal onClose={this.toggleModal} >
				<img src={modalImg} alt={tags} />
			</Modal>)}
			{error && <ErrorMessage message={`We haven't found anything for your search "${searchQuery}"`} />}
			{gallery.length !== 0 && <ImageGallery gallery={gallery} onClick={this.toggleModal} handleModalcontent={this.handleModalcontent} />}
			{loading && <ThreeDots color="red" wrapperStyle={{ justifyContent: "center" }} />}
			{loadMoreBtn && <LoadMoreBtn onClick={this.loadMore}></LoadMoreBtn>}
		</>
		)
	}
}


