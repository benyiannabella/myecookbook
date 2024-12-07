import React from 'react';
import './FormButton.scss';

interface FormButtonsProp {
	caption: string;
	children?: React.ReactNode;
	type?: 'submit' | 'reset' | 'button' | undefined;
	disabled?: boolean;
	className?: string;
	onClick?: (e: any) => void | undefined;
}

const FormButton: React.FunctionComponent<FormButtonsProp> = ({
	children,
	caption,
	type,
	disabled,
	className,
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
				className={className}
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
