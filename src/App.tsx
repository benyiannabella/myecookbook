import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categories from './pages/Categories';
import AboutApp from './pages/AboutApp';
import Favorites from './pages/Favorites';
import Error from './pages/Error';
import Recipes from './pages/Recipes';
import Welcome from './pages/Welcome';
import Modal from './components/wrapper-components/Modal';
import { useGlobalContext } from './GlobalContextProvider';
import Home from './pages/Home';

const App = () => {
	const {
		isAuthenticated,
		showModal,
		modalContent,
		onModalClosed: handleModalClosed,
	} = useGlobalContext();

	return (
		<>
			<Router>
				{isAuthenticated ? (
					<Routes>
						<Route
							path="/"
							element={<Home />}
							errorElement={<Error />}
						>
							<Route
								index
								element={<Favorites />}
							/>
							<Route
								path="/categories"
								element={<Categories />}
								errorElement={<Error />}
							/>
							<Route
								path="/about-app"
								element={<AboutApp />}
								errorElement={<Error />}
							/>
							<Route
								path="/recipes/category-recipes"
								element={<Recipes />}
							/>
						</Route>
					</Routes>
				) : (
					<Routes>
						<Route
							path="/"
							element={<Home />}
						>
							<Route
								index
								element={<Welcome />}
							/>
						</Route>
					</Routes>
				)}
			</Router>
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
