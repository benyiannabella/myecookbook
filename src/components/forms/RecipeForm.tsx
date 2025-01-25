import React, { useEffect, useState } from 'react';
import Form from '../wrapper-components/Form';
import FormButton from '../wrapper-components/FormButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextBox from '../wrapper-components/TextBox';
import FormButtons from '../wrapper-components/FormButtons';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {
	CheckImageExists,
	GetImageUrl,
	GetRecipeIngredientsByRecipeId,
	RemoveImageFromSupabase,
	UploadImageToSupabase,
} from '../../services/RecipeService';
import { toast } from 'react-toastify';
import './RecipeForm.scss';
import SelectBox from '../wrapper-components/SelectBox';
import RecipeIngredient from '../../models/RecipeIngredient';
import TinyMceEditor from '../TinyMceEditor';
import IngredientForm from './IngredientForm';
import UnitOfMeasureForm from './UnitOfMeasureForm';
import MessageBox from '../wrapper-components/MessageBox';
import { useNavigate, useParams } from 'react-router-dom';
import ImageContainer from '../ImageContainer';
import IngredientSelector from '../IngredientSelector';
import { RecipeActionType } from '../../reducer/RecipeReducer';
import {
	createRecipe,
	deleteRecipe,
	updateRecipe,
} from '../../services/Helper';

const RecipeForm: React.FunctionComponent = () => {
	const { state, dispatch, onModalClosed, onModalOpened, getRecipes } =
		useGlobalContext();

	const [selectedImage, setSelectedImage] = useState<string>('');

	const { user, currentRecipe, ingredients, unitsOfMeasure, categories } =
		state;
	const navigate = useNavigate();

	const { categoryId } = useParams();

	const getRecipeIngredients = async (recipeId: string) => {
		GetRecipeIngredientsByRecipeId(recipeId).then((response) => {
			if (response.data) {
				const recipe = { ...currentRecipe, ingredients: response.data };
				dispatch({
					type: RecipeActionType.SetCurrentRecipe,
					value: recipe,
				});
			} else if (response.error) {
				toast.error(`Failed to get ingredients. ${response.error}`);
			}
		});
	};

	useEffect(() => {
		if (currentRecipe?.id === '' && categoryId) {
			const recip = { ...currentRecipe, categoryId: categoryId };
			dispatch({
				type: RecipeActionType.SetCurrentRecipe,
				value: recip,
			});
		} else if (currentRecipe?.id !== '') {
			getRecipeIngredients(currentRecipe.id);
		}
	}, [categoryId]);

	useEffect(() => {
		const getImageFromSupabase = async () => {
			if (selectedImage !== '') {
				await GetImageUrl(selectedImage).then((response) => {
					if (response?.data) {
						const recip = { ...currentRecipe, image: response?.data };

						dispatch({
							type: RecipeActionType.SetCurrentRecipe,
							value: recip,
						});
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
			const recip = { ...currentRecipe, recipeName: e.target.value };
			dispatch({
				type: RecipeActionType.SetCurrentRecipe,
				value: recip,
			});
		}
	};

	const handleCancel = () => {
		navigate(`/categories/${categoryId}/recipes`);
	};

	const handleRecipeSave = () => {
		if (currentRecipe.id === '') {
			if (user) {
				const recip = { ...currentRecipe, userId: user?.id };
				createRecipe(recip, dispatch, navigate);
			}
		} else {
			updateRecipe(currentRecipe);
		}
		onModalClosed();
	};

	const handleDeleteApproved = () => {
		deleteRecipe(currentRecipe, navigate);
		if (categoryId) {
			getRecipes(categoryId);
		}
		onModalClosed();
	};

	const handleRecipeDelete = () => {
		onModalOpened(
			'Delete Recipe',
			<MessageBox
				message="Are you sure you want to delete this recipe?"
				onNoClicked={onModalClosed}
				onYesClicked={handleDeleteApproved}
			/>
		);
	};

	const handleCategoryChanged = (catId: string) => {
		const recip = { ...currentRecipe, categoryId: catId };
		dispatch({
			type: RecipeActionType.SetCurrentRecipe,
			value: recip,
		});
	};

	const handleInstructionsChanged = (instr: string) => {
		const recip = { ...currentRecipe, instructions: instr };
		dispatch({
			type: RecipeActionType.SetCurrentRecipe,
			value: recip,
		});
	};

	const onAddIngredientToList = (recipeIngredient: RecipeIngredient) => {
		const ingr = currentRecipe.ingredients.find(
			(i) => i.ingredientId === recipeIngredient.ingredientId
		);
		if (ingr) {
			toast.warning('Ingredient already added to he list!');
		} else {
			const recipIngr = [...currentRecipe.ingredients];
			const recip = {
				...currentRecipe,
				ingredients: [...recipIngr, recipeIngredient],
			};
			dispatch({
				type: RecipeActionType.SetCurrentRecipe,
				value: recip,
			});
		}
	};

	const handleAddNewIngredient = () => {
		onModalOpened('Add Ingredient', <IngredientForm />);
	};

	const handleAddNewUom = () => {
		onModalOpened('Add Unit of Measure', <UnitOfMeasureForm />);
	};

	const handleRemoveIngredient = (ingredient: RecipeIngredient) => {
		const recipIngrs = currentRecipe.ingredients.filter(
			(i) =>
				i.quantity !== ingredient.quantity &&
				i.ingredientId !== ingredient.ingredientId &&
				i.unitOfMeasureId !== ingredient.unitOfMeasureId
		);
		const recip = { ...currentRecipe, ingredients: recipIngrs };
		dispatch({
			type: RecipeActionType.SetCurrentRecipe,
			value: recip,
		});
	};

	return (
		<Form>
			<div className="recipe-form">
				{currentRecipe.id !== '' ? <h4>{currentRecipe?.recipeName}</h4> : null}
				<div className="top-row">
					<FormButtons>
						<>
							<FormButton
								className="new-button"
								caption="New Ingr"
								onClick={handleAddNewIngredient}
							/>
							<FormButton
								className="new-button"
								caption="New UoM"
								onClick={handleAddNewUom}
							/>
						</>
						{currentRecipe?.id !== '' ? (
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
						value={currentRecipe?.recipeName}
						onValueChanged={handleNameChanged}
					/>
					<SelectBox
						dataSource={categories}
						caption="Category"
						valueField="id"
						displayField="categoryName"
						value={currentRecipe?.categoryId}
						onValueChanged={handleCategoryChanged}
					/>
				</div>
				<div className="top-container">
					<div className="left-container">
						<IngredientSelector onAddIngredientToList={onAddIngredientToList} />
						<ImageContainer
							image={currentRecipe?.image}
							onImageSelection={onImageSelection}
						/>
					</div>
					<div className="ingredient-list">
						<h5>Ingredients:</h5>
						<ul>
							{currentRecipe.ingredients?.map((ingredient, index) => {
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
											onClick={() => handleRemoveIngredient(ingredient)}
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
							value={currentRecipe?.instructions}
						/>
					</div>
				</div>
			</div>
		</Form>
	);
};

export default RecipeForm;
