import React from 'react';
import './FormButtons.scss';

interface FormButtonProp {
	children: React.ReactNode;
	width?: string;
	height?: string;
	bgColor?: string;
}

const FormButtons: React.FunctionComponent<FormButtonProp> = ({
	children,
	width,
	height,
	bgColor,
}) => {
	return (
		<div
			className="form-buttons"
			style={{
				width: `${width}px`,
				height: `${height}px`,
				backgroundColor: `${bgColor}`,
			}}
		>
			{children}
		</div>
	);
};

export default FormButtons;
