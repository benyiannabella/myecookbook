import React from 'react';
import './Card.scss';

interface CardProps {
	children: React.ReactNode;
	className?: string;
}
const Card: React.FunctionComponent<CardProps> = ({ children, className }) => {
	return (
		<div
			className={className ? `card-container ${className}` : 'card-container'}
		>
			{children}
		</div>
	);
};

export default Card;
