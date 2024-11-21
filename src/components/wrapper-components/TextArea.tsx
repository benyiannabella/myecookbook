import React from 'react';

interface TextAreaProps {
	cols?: number;
	rows?: number;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
}

const TextArea: React.FunctionComponent<TextAreaProps> = (props) => {
	const { cols, rows, placeholder, disabled, readonly } = props;
	return (
		<div>
			<textarea
				cols={cols}
				rows={rows}
				placeholder={placeholder}
				disabled={disabled}
				readOnly={readonly}
			></textarea>
		</div>
	);
};

export default TextArea;
