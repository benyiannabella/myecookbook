import React from 'react';
import './Home.scss';
import Navigation from '../components/Navigation';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const Home: React.FunctionComponent = () => {
	return (
		<div className="home">
			<Navigation />
			<Outlet />
			<Footer />
		</div>
	);
};

export default Home;
