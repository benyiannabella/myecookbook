import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import AboutApp from './pages/AboutApp';
import Favorites from './pages/Favorites';
import Error from './pages/Error';
import { useEffect, useState } from 'react';
import Translation from './models/Translation';
import { getRecipeCategories, getTranslations } from './data/db';
import RecipeCategory from './models/RecipeCategory';

const App = () => {
	const [language, setLanguage] = useState('En');
	const [translations, setTranslations] = useState<Translation[] | undefined>(
		undefined
	);
	const [categories, setCategories] = useState<RecipeCategory[] | undefined>(
		undefined
	);

	const handleLanguageChanged = (lang: string) => {
		setLanguage(lang);
	};

	useEffect(() => {
		const fetchData = () => {
			const trs = getTranslations();
			if (trs) {
				setTranslations(trs);
			}
			const ctgs = getRecipeCategories();
			if (ctgs) {
				setCategories(ctgs);
			}
		};
		fetchData();
	}, []);

	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<Home
					language={language}
					onLanguageChanged={handleLanguageChanged}
					translations={translations || null}
				/>
			),
			errorElement: <Error />,
			children: [
				{
					index: true,
					element: <Favorites />,
				},
				{
					path: '/recipes',
					element: <Recipes categories={categories || []} />,
				},
				{
					path: '/about-app',
					element: <AboutApp />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default App;
