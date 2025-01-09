import React from 'react';
import './HomePage.scss';
import Navigation from '../components/Navigation';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const HomePage: React.FunctionComponent = () => {
	return (
		<div className="home">
			<Navigation />
			<Outlet />
			<Footer />
		</div>
	);
};

export default HomePage;
