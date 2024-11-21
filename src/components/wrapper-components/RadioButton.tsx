import React from 'react';

interface RadioButtonProps {
	label: string;
	value: string;
	isSelected: boolean;
	onValueChanged: (lang: string) => void;
}

const RadioButton: React.FunctionComponent<RadioButtonProps> = ({
	label,
	value,
	isSelected,
	onValueChanged,
}) => {
	const handleValueChanged = (event: any) => {
		if (event) {
			onValueChanged(event.target.value);
		}
	};

	return (
		<div className="radio-container ">
			<input
				type="radio"
				id={label}
				value={value}
				checked={isSelected}
				onChange={handleValueChanged}
			/>
			<label
				htmlFor={label}
				className={isSelected ? 'selected' : ''}
			>
				{label}
			</label>
		</div>
	);
};

export default RadioButton;
