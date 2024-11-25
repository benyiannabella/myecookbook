import React from 'react';
import './MessageBox.scss';

interface MessageBoxProps {
	message: string;
	children?: React.ReactNode;
}
const MessageBox: React.FunctionComponent<MessageBoxProps> = ({
	message,
	children,
}) => {
	return (
		<div className="messagebox-container">
			<p>{message}</p>
			{children}
		</div>
	);
};

export default MessageBox;
