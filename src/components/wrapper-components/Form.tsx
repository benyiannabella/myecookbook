import React from 'react';
import './Form.scss';

interface FormProps {
	children?: React.ReactNode;
	onSubmit?: (e: any) => void;
}

const Form: React.FunctionComponent<FormProps> = ({ children, onSubmit }) => {
	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (onSubmit) {
			onSubmit(e);
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
