import React, { useEffect } from 'react';
import FormButtons from '../components/wrapper-components/FormButtons';
import './CategoriesPage.scss';
import FormButton from '../components/wrapper-components/FormButton';
import RecipeCategory from '../models/RecipeCategory';
import Accordion from '../components/wrapper-components/Accordion';
import ImageWrapper from '../components/wrapper-components/ImageWrapper';
import { random } from '@ctrl/tinycolor';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEye,
	faFolderOpen,
	faPenToSquare,
	faPlus,
	faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import CategoryForm from '../components/forms/CategoryForm';
import { useGlobalContext } from '../context/GlobalContextProvider';
import MessageBox from '../components/wrapper-components/MessageBox';
import './ToastStyle.scss';
import { deleteCategory } from '../services/Helper';
import { RecipeActionType } from '../reducer/RecipeReducer';

const CategoriesPage: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const { onModalOpened, onModalClosed, getCategories, state, dispatch } =
		useGlobalContext();

	const { user, categories } = state;

	useEffect(() => {
		getCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.id]);

	const handleAddCategory = () => {
		dispatch({
			type: RecipeActionType.SetCurrentCategory,
			value: {
				id: '',
				userId: user?.id || '',
				categoryName: '',
				image: '',
				description: '',
				recipes: [],
			},
		});
		onModalOpened('Add Recipe Category', <CategoryForm />);
		getCategories();
	};

	const handleAddRecipe = (category: RecipeCategory) => {
		navigate(`/categories/${category.id}/recipes/add-recipe`);
	};

	const handleDeleteCancelled = () => {
		onModalClosed();
	};

	const handleDeleteApproved = (category: RecipeCategory) => {
		deleteCategory(category);
		onModalClosed();
		getCategories();
	};

	const handleDeleteCategory = (e: any, category: RecipeCategory) => {
		onModalOpened(
			'Delete Category',
			<MessageBox
				message="Are you sure you want to delete the selected category? 
                This will remove all it's recipes too."
				onNoClicked={handleDeleteCancelled}
				onYesClicked={() => handleDeleteApproved(category)}
			/>
		);
	};

	const handleViewRecipes = (categoryId: string) => {
		navigate(`/categories/${categoryId}/recipes`);
	};

	const handleEditCategory = (category: RecipeCategory) => {
		onModalOpened(
			'Edit Recipe Category',
			<CategoryForm recipeCategory={category} />
		);
		getCategories();
	};

	return (
		<div className="categories-page">
			<FormButtons>
				<FormButton
					className="new-button"
					caption="Add New Category"
					onClick={handleAddCategory}
				/>
				<h3>Recipe Categories</h3>
			</FormButtons>
			<div className="category-container">
				{categories && categories.length > 0 ? (
					categories.map((category: RecipeCategory) => {
						return (
							<Accordion
								key={category.id}
								title={category.categoryName}
								bgColor={random({ luminosity: 'light' }).toHexString()}
								open
							>
								<FormButton
									caption=""
									onClick={(e: any) => handleViewRecipes(category.id)}
								>
									<FontAwesomeIcon icon={faEye} />
								</FormButton>
								<FormButton
									caption=""
									onClick={() => handleAddRecipe(category)}
								>
									<FontAwesomeIcon icon={faPlus} />
								</FormButton>
								<FormButton
									caption=""
									onClick={() => handleEditCategory(category)}
								>
									<FontAwesomeIcon icon={faPenToSquare} />
								</FormButton>
								<FormButton
									caption=""
									onClick={(e: any) => handleDeleteCategory(e, category)}
								>
									<FontAwesomeIcon icon={faTrashCan} />
								</FormButton>
								<ImageWrapper
									src={category?.image || ''}
									alt={category?.categoryName}
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

export default CategoriesPage;
