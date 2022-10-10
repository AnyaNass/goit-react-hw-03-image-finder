import React from 'react';
import { Backdrop, ModalWindow } from './Modal.styled'

export class Modal extends React.Component {
	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown)
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown)
	}

	handleKeyDown = e => {
		if (e.code === "Escape") {
			this.props.onClose();
		}
	}

	backdropClick = e => {
		if (e.target === e.currentTarget) {
			this.props.onClose();
		}
	}

	render() {
		return (
			<Backdrop onClick={this.backdropClick}>
				<ModalWindow>{this.props.children}</ModalWindow>
			</Backdrop>
		)
	}
}