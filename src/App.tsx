import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import AboutApp from './pages/AboutApp';
import Favorites from './pages/Favorites';
import Error from './pages/Error';
import { useEffect, useState } from 'react';
import RecipeCategory from './models/RecipeCategory';
import Recipes from './pages/Recipes';
import Welcome from './pages/Welcome';
import Modal from './components/wrapper-components/Modal';
import { useGlobalContext } from './GlobalContextProvider';

const App = () => {
	const [categories, setCategories] = useState<RecipeCategory[] | undefined>(
		undefined
	);

	const {
		isAuthenticated,
		showModal,
		modalContent,
		onModalClosed: handleModalClosed,
	} = useGlobalContext();

	useEffect(() => {
		const fetchData = () => {
			const ctgs: RecipeCategory[] = [];
			if (ctgs) {
				setCategories(ctgs);
			}
		};
		fetchData();
	}, []);

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />,
			errorElement: <Error />,
			children: isAuthenticated
				? [
						{
							index: true,
							element: <Favorites />,
						},
						{
							path: '/recipes',
							element: <Categories categories={categories || []} />,
						},
						{
							path: '/about-app',
							element: <AboutApp />,
						},
						{
							path: '/recipes/category-recipes',
							element: <Recipes />,
						},
				  ]
				: [
						{
							index: true,
							element: <Welcome />,
						},
				  ],
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
			{showModal && (
				<Modal
					title={modalContent?.title}
					showModal={showModal}
					onModalClosed={handleModalClosed}
				>
					{modalContent?.content}
				</Modal>
			)}
		</>
	);
};

export default App;
