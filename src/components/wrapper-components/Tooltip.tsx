import React, { useState } from 'react';

interface TooltipProps {
	message: string;
}

const Tooltip: React.FunctionComponent<TooltipProps> = ({ message }) => {
	const [isVisible, setIsVisible] = useState(false);
	const showTooltip = () => setIsVisible(true);
	const hideTooltip = () => setIsVisible(false);
	return (
		<div className="tooltip-container">
			<div
				onMouseEnter={showTooltip}
				onMouseLeave={hideTooltip}
				style={{ cursor: 'pointer' }}
			>
				<span
					role="img"
					aria-label="info"
				>
					ℹ️
				</span>
			</div>
			{isVisible && <div className="message-container">{message}</div>}
		</div>
	);
};
export default Tooltip;
