import React from 'react';
import './FormButton.scss';

interface FormButtonsProp {
	caption: string;
	children?: React.ReactNode;
	type?: 'submit' | 'reset' | 'button' | undefined;
	disabled?: boolean;
	onClick?: (e: any) => void | undefined;
}

const FormButton: React.FunctionComponent<FormButtonsProp> = ({
	children,
	caption,
	type,
	disabled,
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
				disabled={disabled}
			>
				{caption}
				{children}
			</button>
		</div>
	);
};

export default FormButton;
