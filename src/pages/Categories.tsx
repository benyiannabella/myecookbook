import React, { useEffect, useState } from 'react';
import FormButtons from '../components/wrapper-components/FormButtons';
import './Categories.scss';
import FormButton from '../components/wrapper-components/FormButton';
import RecipeCategory from '../models/RecipeCategory';
import Accordion from '../components/wrapper-components/Accordion';
import ImageWrapper from '../components/wrapper-components/ImageWrapper';
import { random } from '@ctrl/tinycolor';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFolderOpen,
	faPenToSquare,
	faPlus,
	faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import CategoryForm from '../components/CategoryForm';
import { useGlobalContext } from '../GlobalContextProvider';
import { GetCategoriesByUserId } from '../services/RecipeService';

const Categories: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const { onModalOpened, user } = useGlobalContext();

	const [categories, setCategories] = useState<RecipeCategory[] | undefined>(
		undefined
	);

	const getCategories = async () => {
		if (user) {
			const response = await GetCategoriesByUserId(user?.id);
			if (response.data) {
				setCategories(response.data);
			} else {
				console.log(response.error);
			}
		}
	};

	useEffect(() => {
		getCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.id]);

	const handleAddCategory = () => {
		onModalOpened('Add Recipe Category', <CategoryForm />);
	};

	const handleAddRecipe = () => {};

	const handleDeleteCategory = () => {};

	const handleViewRecipes = () => {
		navigate('/recipes/category-recipes');
	};

	return (
		<div className="categories-page">
			<FormButtons>
				<FormButton
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
									onClick={handleAddRecipe}
								>
									<FontAwesomeIcon icon={faPlus} />
								</FormButton>
								<FormButton
									caption=""
									onClick={handleAddRecipe}
								>
									<FontAwesomeIcon icon={faPenToSquare} />
								</FormButton>
								<FormButton
									caption=""
									onClick={handleDeleteCategory}
								>
									<FontAwesomeIcon icon={faTrashCan} />
								</FormButton>
								<ImageWrapper
									src={category?.image || ''}
									alt={category?.categoryName}
									width="350"
									height="350"
								/>
								<FormButton
									caption="View Recipes"
									onClick={handleViewRecipes}
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

export default Categories;
