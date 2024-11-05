import React from 'react';

interface ImageWrapperProps {
	src: string;
	alt: string;
	width?: string;
	height?: string;
}

const ImageWrapper: React.FunctionComponent<ImageWrapperProps> = ({
	src,
	alt,
	width,
	height,
}) => {
	return (
		<div className="image-container">
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
