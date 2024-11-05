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
		if (label === 'Home' || label === 'Acasă') {
			return '/';
		}
		if (label === 'Recipes' || label === 'Rețete') {
			return '/recipes';
		}
		if (label === 'About App' || label === 'Despre Aplicație') {
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
