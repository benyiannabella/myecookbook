import React, { useState } from 'react';
import './Accordion.scss';

interface AccordionProps {
	open?: boolean;
	title: string;
	bgColor?: string;
	children?: React.ReactNode;
	role?: string;
}

const Accordion: React.FunctionComponent<AccordionProps> = ({
	open,
	title,
	bgColor,
	children,
	role,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		if (!open) {
			setIsOpen((previousValue) => !previousValue);
		}
	};

	return (
		<div className="accordion">
			<div
				className="accordion-header"
				role="button"
				onClick={handleClick}
				style={{ backgroundColor: `${bgColor}` }}
			>
				{title}
			</div>
			<div
				className={
					open || isOpen ? 'accordion-body-show' : 'accordion-body-hide'
				}
				role={role}
			>
				{children}
			</div>
		</div>
	);
};

export default Accordion;
