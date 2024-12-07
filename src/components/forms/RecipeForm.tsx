import React, { useEffect, useRef, useState } from 'react';
import Form from '../wrapper-components/Form';
import FormButton from '../wrapper-components/FormButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextBox from '../wrapper-components/TextBox';
import FormButtons from '../wrapper-components/FormButtons';
import Recipe from '../../models/Recipe';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {
	CheckImageExists,
	CreateRecipe,
	CreateRecipeIngredients,
	DeleteIngredientById,
	DeleteRecipeById,
	DeleteUnitOfMeasureById,
	GetImageUrl,
	RemoveImageFromSupabase,
	UpdateRecipeById,
	UploadImageToSupabase,
} from '../../services/RecipeService';
import { toast } from 'react-toastify';
import './RecipeForm.scss';
import SelectBox from '../wrapper-components/SelectBox';
import RecipeIngredient from '../../models/RecipeIngredient';
import TinyMceEditor from '../TinyMceEditor';
import IngredientForm from './IngredientForm';
import UnitOfMeasureForm from './UnitOfMeasureForm';
import Ingredient from '../../models/Ingredient';
import UnitOfMeasure from '../../models/UnitOfMeasure';
import MessageBox from '../wrapper-components/MessageBox';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageContainer from '../ImageContainer';
import IngredientSelector from '../IngredientSelector';

interface RecipeProps {
	recipeId?: string;
}

const RecipeForm: React.FunctionComponent<RecipeProps> = ({ recipeId }) => {
	const {
		state,
		onModalClosed,
		onModalOpened,
		getIngredients,
		getUnitsOfMeasure,
	} = useGlobalContext();

	const [selectedImage, setSelectedImage] = useState<string>('');

	const { user, ingredients, unitsOfMeasure, categories } = state;
	const navigate = useNavigate();

	const location = useLocation();
	const { categoryId } = location.state;

	const [recipe, setRecipe] = useState<Recipe>({
		id: '',
		userId: user?.id || '',
		categoryId: categoryId || '',
		recipeName: '',
		instructions: '',
		image: '',
		isFavorite: false,
		ingredients: [],
	});

	useEffect(() => {
		const getImageFromSupabase = async () => {
			if (selectedImage !== '') {
				await GetImageUrl(selectedImage).then((response) => {
					if (response.data) {
						const recip = { ...recipe, image: response.data };
						setRecipe(recip);
					}
					if (response.error) {
						toast.error(
							`Failed to get image from the storage. ${response.error}`
						);
					}
				});
			}
		};

		getImageFromSupabase();
	}, [selectedImage]);

	useEffect(() => {
		if (categoryId) {
			const recip = { ...recipe, categoryId: categoryId };
			setRecipe(recip);
		}
	}, [categoryId]);

	const onImageSelection = async (e: any) => {
		const file = e.target.files[0];

		if (selectedImage) {
			await RemoveImageFromSupabase(selectedImage);
		}

		if (file) {
			await CheckImageExists('project_images', `public/${file.name}`).then(
				(response) => {
					if (!response) {
						setSelectedImage(file.name);
						UploadImageToSupabase(file);
					}
				}
			);
		}
	};

	const handleNameChanged = (e: any) => {
		if (e) {
			const recip = { ...recipe, recipeName: e.target.value };
			setRecipe(recip);
		}
	};

	const handleCancel = () => {
		navigate('/categories');
	};

	const handleRecipeSave = () => {
		if (recipe.id === '') {
			CreateRecipe(recipe).then((response) => {
				if (response.statusCode === 201 && response.data) {
					toast.success('Recipe successfully created!');
					const recipIngredients = recipe.ingredients.map((recIngr) => {
						return { ...recIngr, recipeId: response.data[0].id };
					});
					const recip = {
						...recipe,
						id: response.data[0].id,
						ingredients: recipIngredients,
					};
					setRecipe(recip);

					CreateRecipeIngredients(recipIngredients, recip.id);
				} else if (response.error) {
					toast.error(`Failed to create recipe! ${response.error}`);
				}
			});
		} else {
			UpdateRecipeById(recipe).then((response) => {
				if (response.statusCode === 204) {
					onModalClosed();
					toast.success('Recipe successfully updated!');
				} else if (response.error) {
					toast.error(`Failed to update recipe! ${response.error}`);
				}
			});
		}
	};

	const deleteRecipe = async () => {
		await DeleteRecipeById(recipe.id).then((response) => {
			if (response.statusCode === 204) {
				toast.success(`Recipe ${recipe.recipeName} successfully deleted.`);
				navigate('/categories');
			} else if (response.error) {
				toast.error(`Failed to delete ${recipe.recipeName}.${response.error}.`);
			}
		});
	};

	const handleRecipeDelete = () => {
		onModalOpened(
			'Delete Recipe',
			<MessageBox
				message="Are you sure you want to delete this recipe?"
				onNoClicked={onModalClosed}
				onYesClicked={deleteRecipe}
			/>
		);
	};

	const handleCategoryChanged = (catId: string) => {
		const recip = { ...recipe, categoryId: catId };
		setRecipe(recip);
	};

	const handleInstructionsChanged = (instr: string) => {
		const recip = { ...recipe, instructions: instr };
		setRecipe(recip);
	};

	const onAddIngredientToList = (recipeIngredient: RecipeIngredient) => {
		const ingr = recipe.ingredients.find(
			(i) => i.ingredientId === recipeIngredient.ingredientId
		);
		if (ingr) {
			toast.warning('Ingredient already added to he list!');
		} else {
			const recipIngr = [...recipe.ingredients];
			const recip = {
				...recipe,
				ingredients: [...recipIngr, recipeIngredient],
			};
			setRecipe(recip);
		}
	};

	const handleAddNewIngredient = () => {
		onModalOpened('Add Ingredient', <IngredientForm />);
	};

	const handleAddNewUom = () => {
		onModalOpened('Add Unit of Measure', <UnitOfMeasureForm />);
	};

	const handleRemove = (ingredient: RecipeIngredient) => {
		console.log(ingredient);
		const recipIngrs = recipe.ingredients.filter(
			(i) =>
				i.quantity !== ingredient.quantity &&
				i.ingredientId !== ingredient.ingredientId &&
				i.unitOfMeasureId !== ingredient.unitOfMeasureId
		);
		console.log(recipIngrs);
		const recip = { ...recipe, ingredients: recipIngrs };
		setRecipe(recip);
	};

	return (
		<Form>
			<div className="recipe-form">
				{recipe.id !== '' ? <h4>{recipe.recipeName}</h4> : null}
				<div className="top-row">
					<FormButtons>
						<FormButton
							className="new-button"
							caption="New Ingredient"
							onClick={handleAddNewIngredient}
						/>
						<FormButton
							className="new-button"
							caption="New UoM"
							onClick={handleAddNewUom}
						/>
						{recipe.id !== '' ? (
							<FormButton
								className="primary-button"
								caption="Delete"
								onClick={handleRecipeDelete}
							/>
						) : null}
						<FormButton
							className="secondary-button"
							caption="Cancel"
							onClick={handleCancel}
						/>
						<FormButton
							className="save-button"
							caption="Save"
							onClick={handleRecipeSave}
						/>
					</FormButtons>
					<TextBox
						label="Name"
						value={recipe.recipeName}
						onValueChanged={handleNameChanged}
					/>
					<SelectBox
						dataSource={categories}
						caption="Category"
						valueField="id"
						displayField="categoryName"
						value={recipe.categoryId}
						onValueChanged={handleCategoryChanged}
					/>
				</div>
				<div className="top-container">
					<div className="left-container">
						<IngredientSelector onAddIngredientToList={onAddIngredientToList} />
						<ImageContainer
							image={recipe.image}
							onImageSelection={onImageSelection}
						/>
					</div>
					<div className="ingredient-list">
						<h5>Ingredients:</h5>
						<ul>
							{recipe.ingredients.map((ingredient, index) => {
								return (
									<li key={index}>
										<span>
											{ingredient.quantity}{' '}
											{
												unitsOfMeasure.find(
													(u) => u.id === ingredient.unitOfMeasureId
												)?.unitOfMeasureCode
											}{' '}
											{
												ingredients.find(
													(i) => i.id === ingredient.ingredientId
												)?.ingredientName
											}
										</span>
										<FormButton
											caption=""
											onClick={() => handleRemove(ingredient)}
										>
											<FontAwesomeIcon icon={faTrashCan} />
										</FormButton>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="editor-container">
						<h5>Cooking Instructions</h5>
						<TinyMceEditor
							onEditorChanged={handleInstructionsChanged}
							height={500}
						/>
					</div>
				</div>
			</div>
		</Form>
	);
};

export default RecipeForm;
