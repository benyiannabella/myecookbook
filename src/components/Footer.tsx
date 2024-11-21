import React from 'react';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
	return (
		<div className="footer">
			Made with &nbsp;
			<FontAwesomeIcon
				icon={faHeart}
				color="red"
			/>
			&nbsp; by &copy;Pityi
		</div>
	);
};

export default Footer;
