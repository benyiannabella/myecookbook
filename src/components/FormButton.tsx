import React from 'react';
import './FormButton.scss';

interface FormButtonsProp {
	caption: string;
	children?: React.ReactNode;
	onClick: () => void;
}

const FormButton: React.FunctionComponent<FormButtonsProp> = ({
	children,
	caption,
	onClick,
}) => {
	const handleClick = () => {
		onClick();
	};

	return (
		<div className="form-button">
			<button onClick={handleClick}>
				{caption}
				{children}
			</button>
		</div>
	);
};

export default FormButton;
