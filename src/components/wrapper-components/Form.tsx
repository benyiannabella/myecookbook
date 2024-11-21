import React from 'react';
import './Form.scss';

interface FormProps {
	children?: React.ReactNode;
	onSubmit?: () => void;
}

const Form: React.FunctionComponent<FormProps> = ({ children, onSubmit }) => {
	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (onSubmit) {
			onSubmit();
		}
	};

	return (
		<form
			className="form-container"
			onSubmit={handleSubmit}
		>
			{children}
		</form>
	);
};

export default Form;
