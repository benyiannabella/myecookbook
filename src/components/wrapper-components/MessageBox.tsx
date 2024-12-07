import React from 'react';
import './MessageBox.scss';
import FormButtons from './FormButtons';
import FormButton from './FormButton';

interface MessageBoxProps {
	message: string;
	onNoClicked: () => void;
	onYesClicked: () => void;
}
const MessageBox: React.FunctionComponent<MessageBoxProps> = ({
	message,
	onNoClicked,
	onYesClicked,
}) => {
	const handleNoCancelled = () => {
		onNoClicked();
	};

	const handleYesClicked = () => {
		onYesClicked();
	};

	return (
		<div className="messagebox-container">
			<p>{message}</p>
			<FormButtons>
				<FormButton
					className="secondary-button"
					caption="No"
					onClick={handleNoCancelled}
				/>
				<FormButton
					className="new-button"
					caption="Yes"
					onClick={handleYesClicked}
				/>
			</FormButtons>
		</div>
	);
};

export default MessageBox;
