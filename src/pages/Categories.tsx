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
import {
	DeleteCategoryById,
	RemoveImageFromSupabase,
} from '../services/RecipeService';
import MessageBox from '../components/wrapper-components/MessageBox';
import { toast } from 'react-toastify';
import './ToastStyle.scss';
import { GetImageNameFromUrl } from '../Helper';

const Categories: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const { onModalOpened, onModalClosed, user, getCategories, categories } =
		useGlobalContext();

	useEffect(() => {
		getCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.id]);

	const handleAddCategory = () => {
		onModalOpened(
			'Add Recipe Category',
			<CategoryForm onModalClosed={handleModalClosed} />
		);
		getCategories();
	};

	const handleAddRecipe = (categoryId: string) => {
		navigate('/recipes/add-recipe', { state: { categoryId } });
	};

	const handleDeleteCancelled = () => {
		onModalClosed();
	};

	const handleModalClosed = () => {
		onModalClosed();
		getCategories();
	};

	const handleDeleteApproved = (category: RecipeCategory) => {
		DeleteCategoryById(category.id).then((response) => {
			if (response.statusCode === 204) {
				toast.success('Category deleted');

				RemoveImageFromSupabase(GetImageNameFromUrl(category.image ?? '')).then(
					(res) => {
						if (res.error) {
							toast.error(`Failed to remove image from storage ${res.error}`);
						}
					}
				);

				handleModalClosed();
			} else if (response.error) {
				toast.error(`Failed to delete category. ${response.error}!`);
			}
		});
	};

	const handleDeleteCategory = (e: any, category: RecipeCategory) => {
		onModalOpened(
			'Delete Category',
			<MessageBox
				message="Are you sure you want to delete the selected category? 
                This will remove all it's recipes too."
			>
				<FormButtons>
					<FormButton
						caption="No"
						onClick={handleDeleteCancelled}
					/>
					<FormButton
						caption="Yes"
						onClick={() => handleDeleteApproved(category)}
					/>
				</FormButtons>
			</MessageBox>
		);
	};

	const handleCategoryClicked = () => {
		navigate('/recipes/category-recipes');
	};

	const handleEditCategory = (category: RecipeCategory) => {
		onModalOpened(
			'Edit Recipe Category',
			<CategoryForm
				recipeCategory={category}
				onModalClosed={handleModalClosed}
			/>
		);
		getCategories();
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
								role="button"
								// onClick={handleCategoryClicked}
							>
								<FormButton
									caption=""
									onClick={() => handleAddRecipe(category.id)}
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

export default Categories;
