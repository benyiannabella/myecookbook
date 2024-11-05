import React from 'react';
import './Home.scss';
import Navigation from '../components/Navigation';
import { Outlet } from 'react-router-dom';
import Translation from '../models/Translation';
import { translations } from '../data/translations';

interface HomeProps {
	language: string;
	translations: Translation[] | null;
	onLanguageChanged: (lang: string) => void;
}

const Home: React.FunctionComponent<HomeProps> = ({
	language,
	onLanguageChanged,
}) => {
	return (
		<div className="home">
			<Navigation
				language={language}
				translations={translations}
				onLanguageChanged={onLanguageChanged}
			/>
			<Outlet />
		</div>
	);
};

export default Home;
