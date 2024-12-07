import React from 'react';
import './ImageWrapper.scss';

interface ImageWrapperProps {
	src: string;
	alt: string;
	width?: string | number;
	height?: string | number;
}

const ImageWrapper: React.FunctionComponent<ImageWrapperProps> = ({
	src,
	alt,
	width,
	height,
}) => {
	return (
		<div className="image-wrapper">
			<img
				src={src}
				alt={alt}
				width={width}
				height={height}
			/>
		</div>
	);
};

export default ImageWrapper;
