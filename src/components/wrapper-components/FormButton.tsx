import React from 'react';
import './FormButton.scss';

interface FormButtonsProp {
	caption: string;
	children?: React.ReactNode;
	type?: 'submit' | 'reset' | 'button' | undefined;
	onClick?: (e: any) => void | undefined;
}

const FormButton: React.FunctionComponent<FormButtonsProp> = ({
	children,
	caption,
	type,
	onClick,
}) => {
	const handleClick = (e: any) => {
		if (onClick) {
			onClick(e);
		}
	};

	return (
		<div className="form-button">
			<button
				onClick={handleClick}
				type={type}
			>
				{caption}
				{children}
			</button>
		</div>
	);
};

export default FormButton;
