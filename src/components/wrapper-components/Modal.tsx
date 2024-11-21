import React from 'react';
import './Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import FormButton from './FormButton';

interface ModalProps {
	showModal: boolean;
	title?: string;
	children?: React.ReactNode;
	onModalClosed: () => void;
}

const Modal: React.FunctionComponent<ModalProps> = ({
	showModal,
	children,
	title,
	onModalClosed,
}) => {
	const handleModalClose = () => {
		onModalClosed();
	};

	return (
		<div className={showModal ? 'overlay' : 'hide-overlay'}>
			<div className="modal">
				<div className="modal-header">
					{title}
					<FormButton
						type="button"
						onClick={handleModalClose}
						caption={''}
					>
						<FontAwesomeIcon icon={faXmark} />
					</FormButton>
				</div>
				<div className="modal-body">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
