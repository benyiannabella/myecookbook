import React, { useEffect, useState } from 'react';
import './Navigation.scss';
import NavButtonGroup from './NavButtonGroup';
import RadioButton from './RadioButton';
import Translation from '../models/Translation';
import { getFieldTranslation } from '../data/helper';

interface NavigationProps {
	language: string;
	translations: Translation[];
	onLanguageChanged: (lang: string) => void;
}

const Navigation: React.FunctionComponent<NavigationProps> = ({
	language,
	translations,
	onLanguageChanged,
}) => {
	const [languageData, setLanguageData] = useState<string[]>();

	useEffect(() => {
		const title = getFieldTranslation(translations, 'title', language);
		const lang = getFieldTranslation(translations, 'language', language);
		const home = getFieldTranslation(translations, 'home', language);
		const recipes = getFieldTranslation(translations, 'recipes', language);
		const aboutApp = getFieldTranslation(translations, 'aboutApp', language);
		setLanguageData([
			title || '',
			lang || '',
			home || '',
			recipes || '',
			aboutApp || '',
		]);
	}, [language, translations]);

	const [title, lang, home, recipes, aboutApp] = languageData ?? [];

	return (
		<div className="navigation">
			<div className="navigation-content">
				<div className="navigation-content-left">
					<h3 className="title">{title}</h3>
				</div>
				<div className="navigation-content-right">
					<NavButtonGroup
						labels={[home || '', recipes || '', aboutApp || '']}
					/>
					<div className="language-container">
						<span className="label">{lang}</span>
						<RadioButton
							label="En"
							value="En"
							isSelected={language === 'En'}
							onValueChanged={onLanguageChanged}
						/>
						<RadioButton
							label="Ro"
							value="Ro"
							isSelected={language === 'Ro'}
							onValueChanged={onLanguageChanged}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
