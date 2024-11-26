import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavButtonGroup.scss';

interface NavButtonGroupProps {
	labels: string[];
}

const NavButtonGroup: React.FunctionComponent<NavButtonGroupProps> = ({
	labels,
}) => {
	const getPath = (label: string): string => {
		if (label === 'Home') {
			return '/';
		}
		if (label === 'Categories') {
			return '/categories';
		}
		if (label === 'About App') {
			return '/about-app';
		}
		return '/';
	};

	return (
		<div className="button-group">
			{labels.map((label, index) => {
				return (
					<button key={index}>
						<NavLink to={getPath(label)}>{label}</NavLink>
					</button>
				);
			})}
		</div>
	);
};

export default NavButtonGroup;
