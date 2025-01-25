import React, { useState } from 'react';
import './TextBox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Tooltip from './Tooltip';

interface TextBoxProps {
	label: string;
	value?: string | number;
	type?: React.HTMLInputTypeAttribute;
	minValue?: number;
	maxValue?: number;
	children?: React.ReactNode;
	placeholder?: string;
	error?: string;
	className?: string;
	name?: string;
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
	error,
	className,
	name,
	onValueChanged,
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const showTooltip = () => setIsVisible(true);
	const hideTooltip = () => setIsVisible(false);

	const handleValueChanged = (e: any) => {
		onValueChanged(e);
	};

	return (
		<div className="textbox-container">
			<label htmlFor="textbox">{label}</label>
			<input
				name={name}
				type={type}
				minLength={type === 'text' ? minValue : undefined}
				maxLength={type === 'text' ? maxValue : undefined}
				value={value}
				min={type === 'number' ? minValue : undefined}
				max={type === 'number' ? maxValue : undefined}
				placeholder={placeholder ? placeholder : 'Enter text here...'}
				onChange={handleValueChanged}
			/>
			{error && (
				<div className="tooltip-container">
					<div
						onMouseEnter={showTooltip}
						onMouseLeave={hideTooltip}
						style={{ cursor: 'pointer' }}
					>
						<FontAwesomeIcon
							color="red"
							icon={faCircleExclamation}
						/>
					</div>
					{isVisible && <div className="message-container">{error}</div>}
				</div>
			)}
			{children}
		</div>
	);
};

export default TextBox;
