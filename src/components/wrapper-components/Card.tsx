import React from 'react';
import './Card.scss';

interface CardProps {
	children: React.ReactNode;
	onClick?: () => void;
}
const Card: React.FunctionComponent<CardProps> = ({ children, onClick }) => {
	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};
	return (
		<div
			className="card-container"
			role="button"
			onClick={handleClick}
		>
			{children}
		</div>
	);
};

export default Card;
