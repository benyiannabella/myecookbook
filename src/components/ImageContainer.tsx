import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import ImageWrapper from './wrapper-components/ImageWrapper';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import FormButton from './wrapper-components/FormButton';
import './ImageContainer.scss';

interface ImageContainerProps {
	image: string;
	onImageSelection: (e: any) => Promise<void>;
}

const ImageContainer: React.FunctionComponent<ImageContainerProps> = ({
	image,
	onImageSelection,
}) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const openFileChooser = () => {
		fileInputRef?.current?.click();
	};

	const handleImageSelection = (e: any) => {
		onImageSelection(e);
	};
	if (image === '') {
		return (
			<>
				<div className="empty-image-container">
					Click To Upload Image
					<FormButton
						caption={''}
						onClick={openFileChooser}
					>
						<FontAwesomeIcon icon={faImage} />
					</FormButton>
				</div>
				<input
					type="file"
					accept="image/*"
					ref={fileInputRef}
					onChange={handleImageSelection}
					hidden
				/>
			</>
		);
	}

	return (
		<>
			<div className="image-container">
				<ImageWrapper
					src={image || ''}
					alt="Image Preview"
					width={250}
					height={250}
				/>
				<div
					role="button"
					onClick={openFileChooser}
					className="upload-preview"
				>
					<FontAwesomeIcon icon={faImage} />
				</div>
			</div>
			<input
				type="file"
				accept="image/*"
				ref={fileInputRef}
				onChange={handleImageSelection}
				hidden
			/>
		</>
	);
};

export default ImageContainer;
