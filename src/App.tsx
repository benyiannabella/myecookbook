import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage';
import AboutAppPage from './pages/AboutAppPage';
import FavoritesPage from './pages/FavoritesPage';
import ErrorPage from './pages/ErrorPage';
import Recipes from './pages/RecipesPage';
import LoginPage from './pages/LoginPage';
import Modal from './components/wrapper-components/Modal';
import { useGlobalContext } from './context/GlobalContextProvider';
import HomePage from './pages/HomePage';
import { ToastContainer } from 'react-toastify';
import RecipePage from './pages/RecipePage';

const App = () => {
	const { state, onModalClosed } = useGlobalContext();
	const { isAuthenticated, showModal, modalContent } = state;

	return (
		<>
			<Router>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar
					closeOnClick
					draggable
					pauseOnHover
					theme="color"
				/>
				{isAuthenticated ? (
					<Routes>
						<Route
							path="/"
							element={<HomePage />}
							errorElement={<ErrorPage />}
						>
							<Route
								index
								element={<FavoritesPage />}
							/>
							<Route
								path="categories"
								element={<CategoriesPage />}
								errorElement={<ErrorPage />}
							/>
							<Route
								path="categories/:categoryId/recipes"
								element={<Recipes />}
							/>
							<Route
								path="categories/:categoryId/recipes/add-recipe"
								element={<RecipePage />}
							/>
							<Route
								path="categories/:categoryId/recipes/:recipeId"
								element={<RecipePage />}
							/>
							<Route
								path="about-app"
								element={<AboutAppPage />}
								errorElement={<ErrorPage />}
							/>
						</Route>
					</Routes>
				) : (
					<Routes>
						<Route
							path="/"
							element={<HomePage />}
						>
							<Route
								index
								element={<LoginPage />}
							/>
						</Route>
					</Routes>
				)}
			</Router>
			{showModal && (
				<Modal
					title={modalContent?.title}
					showModal={showModal}
					onModalClosed={onModalClosed}
				>
					{modalContent?.content}
				</Modal>
			)}
		</>
	);
};

export default App;
