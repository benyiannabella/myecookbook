import React from 'react';
import './TextArea.scss';

interface TextAreaProps {
	cols?: number;
	rows?: number;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	resize?: boolean;
	value?: string;
	onValueChanged?: (e: any) => void;
}

const TextArea: React.FunctionComponent<TextAreaProps> = (props) => {
	const {
		cols,
		rows,
		placeholder,
		disabled,
		readonly,
		resize,
		value,
		onValueChanged,
	} = props;
	return (
		<div>
			<textarea
				className={!resize ? 'text-area no-resize' : 'text-area'}
				cols={cols}
				rows={rows}
				placeholder={placeholder}
				disabled={disabled}
				readOnly={readonly}
				value={value}
				onChange={onValueChanged}
			></textarea>
		</div>
	);
};

export default TextArea;
