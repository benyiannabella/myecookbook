import React, { useEffect } from 'react';
import Recipe from '../models/Recipe';
import ImageWrapper from '../components/wrapper-components/ImageWrapper';
import { useNavigate, useParams } from 'react-router-dom';
import { random } from '@ctrl/tinycolor';
import Accordion from '../components/wrapper-components/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFolderOpen,
	faPenToSquare,
	faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import './RecipesPage.scss';
import FormButton from '../components/wrapper-components/FormButton';
import { useGlobalContext } from '../context/GlobalContextProvider';
import { deleteRecipe } from '../services/Helper';
import MessageBox from '../components/wrapper-components/MessageBox';
import FormButtons from '../components/wrapper-components/FormButtons';
import { RecipeActionType } from '../reducer/RecipeReducer';
import RecipeDetails from '../components/RecipeDetails';

const RecipesPage: React.FunctionComponent = () => {
	const { categoryId } = useParams();
	const navigate = useNavigate();

	const { state, dispatch, onModalOpened, onModalClosed, getRecipes } =
		useGlobalContext();

	const { user, recipes, currentCategory } = state;

	useEffect(() => {
		if (categoryId) {
			getRecipes(categoryId);
		}
	}, [categoryId]);

	const handleDeleteCancelled = () => {
		onModalClosed();
	};

	const handleDeleteApproved = (recipe: Recipe) => {
		deleteRecipe(recipe, navigate);
		if (categoryId) {
			getRecipes(categoryId);
		}
		onModalClosed();
	};

	const handleDeleteRecipe = (e: any, recipe: Recipe) => {
		e.stopPropagation();
		onModalOpened(
			'Delete Recipe',
			<MessageBox
				message="Are you sure you want to delete the selected recipe?"
				onNoClicked={handleDeleteCancelled}
				onYesClicked={() => handleDeleteApproved(recipe)}
			/>
		);
	};

	const handleEditRecipe = (e: any, recipe: Recipe) => {
		e.stopPropagation();
		dispatch({
			type: RecipeActionType.SetCurrentRecipe,
			value: recipe,
		});
		navigate(`/categories/${categoryId}/recipes/${recipe.id}`);
	};

	const handleAddRecipe = () => {
		dispatch({
			type: RecipeActionType.SetCurrentRecipe,
			value: {
				id: '',
				userId: user?.id || '',
				categoryId: categoryId || '',
				recipeName: '',
				instructions: '',
				image: '',
				isFavorite: false,
				ingredients: [],
			},
		});
		navigate(`/categories/${categoryId}/recipes/add-recipe`);
	};

	const handleToCategories = () => {
		navigate('/categories');
	};

	const handleRecipeClick = (recipe: Recipe) => {
		onModalOpened(`${recipe.recipeName}`, <RecipeDetails recipe={recipe} />);
	};

	return (
		<div className="recipes-page">
			<div className="recipes-top-row">
				<FormButtons>
					<FormButton
						className="new-button"
						caption="Add New Recipe"
						onClick={handleAddRecipe}
					/>
					<FormButton
						className="secondary-button"
						caption="Back To Categories"
						onClick={handleToCategories}
					/>
				</FormButtons>
				<h3>{currentCategory.categoryName + ' Recipes'}</h3>
			</div>
			<div className="recipes-container">
				{recipes && recipes.length > 0 ? (
					recipes.map((recipe) => {
						return (
							<Accordion
								key={recipe.id}
								title={recipe.recipeName}
								bgColor={random({ luminosity: 'light' }).toHexString()}
								open
								role="button"
								onClick={() => handleRecipeClick(recipe)}
							>
								<FormButton
									caption=""
									onClick={(e: any) => handleEditRecipe(e, recipe)}
								>
									<FontAwesomeIcon icon={faPenToSquare} />
								</FormButton>
								<FormButton
									caption=""
									onClick={(e: any) => handleDeleteRecipe(e, recipe)}
								>
									<FontAwesomeIcon icon={faTrashCan} />
								</FormButton>
								<ImageWrapper
									src={recipe?.image || ''}
									alt={recipe?.recipeName}
									width="250"
									height="250"
								/>
							</Accordion>
						);
					})
				) : (
					<div className="category-not-found">
						<FontAwesomeIcon icon={faFolderOpen} />
					</div>
				)}
			</div>
		</div>
	);
};

export default RecipesPage;
