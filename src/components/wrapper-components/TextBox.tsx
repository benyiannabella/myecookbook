import React from 'react';
import './TextBox.scss';

interface TextBoxProps {
	label: string;
	value?: string;
	type?: React.HTMLInputTypeAttribute;
	minValue?: number;
	maxValue?: number;
	children?: React.ReactNode;
	placeholder?: string;
	onValueChanged: (e: any) => void;
}

const TextBox: React.FunctionComponent<TextBoxProps> = ({
	label,
	value,
	type,
	minValue,
	maxValue,
	children,
	placeholder,
	onValueChanged,
}) => {
	const handleValueChanged = (e: any) => {
		onValueChanged(e);
	};

	return (
		<div className="textbox-container">
			<label htmlFor="textbox">{label}</label>
			<input
				name="textbox"
				type={type}
				minLength={type === 'text' ? minValue : undefined}
				maxLength={type === 'text' ? maxValue : undefined}
				value={value}
				min={type === 'number' ? minValue : undefined}
				max={type === 'number' ? maxValue : undefined}
				placeholder={placeholder ? placeholder : 'Enter text here...'}
				onChange={handleValueChanged}
			/>
			{children}
		</div>
	);
};

export default TextBox;
