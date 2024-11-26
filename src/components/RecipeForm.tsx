import React, { useEffect, useRef, useState } from 'react';
import Form from './wrapper-components/Form';
import FormButton from './wrapper-components/FormButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImageWrapper from './wrapper-components/ImageWrapper';
import TextBox from './wrapper-components/TextBox';
import TextArea from './wrapper-components/TextArea';
import FormButtons from './wrapper-components/FormButtons';
import RecipeCategory from '../models/RecipeCategory';
import Recipe from '../models/Recipe';
import { useGlobalContext } from '../GlobalContextProvider';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import {
	CheckImageExists,
	CreateRecipe,
	GetImageUrl,
	RemoveImageFromSupabase,
	UpdateRecipeById,
	UploadImageToSupabase,
} from '../services/RecipeService';
import { toast } from 'react-toastify';
import './RecipeForm.scss';
import SelectBox from './wrapper-components/SelectBox';
import RecipeIngredient from '../models/RecipeIngredient';
import TinyMceEditor from './TinyMceEditor';

interface RecipeProps {
	categoryId?: string;
	categories: RecipeCategory[];
}

const RecipeForm: React.FunctionComponent<RecipeProps> = ({
	categoryId,
	categories,
}) => {
	const { user, unitsOfMeasure, ingredients, onModalClosed } =
		useGlobalContext();
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [selectedImage, setSelectedImage] = useState<string>('');

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

	const [recipeIngredient, setRecipeIngredient] = useState<RecipeIngredient>({
		id: '',
		recipeId: '',
		ingredientId: '',
		unitOfMeasureId: '',
		quantity: 0,
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
	}, [selectedImage, recipe]);

	const openFileChooser = () => {
		fileInputRef?.current?.click();
	};

	const handleImageSelection = async (e: any) => {
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

	const handleDescriptionChange = (e: any) => {
		if (e) {
			const recip = { ...recipe, description: e.target.value };
			setRecipe(recip);
		}
	};

	const handleCancel = () => {
		onModalClosed();
	};

	const handleRecipeSave = () => {
		if (recipe.id === '') {
			CreateRecipe(recipe).then((response) => {
				if (response.statusCode === 201) {
					toast.success('Recipe successfully created!');
					onModalClosed();
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

	const handleCategoryChanged = (categoryId: string) => {
		const recip = { ...recipe, categoryId };
		setRecipe(recip);
	};

	const handleQuantityChanged = (e: any) => {
		if (e) {
			setRecipeIngredient(e);
		}
	};

	const handleAddIngredient = () => {
		const recipIngr = [...recipe.ingredients];
		const recip = {
			...recipe,
			ingredients: [...recipIngr, recipeIngredient],
		};
		setRecipe(recip);
	};

	return (
		<Form>
			<div className="recipe-form">
				<div className="top-row">
					<FormButtons>
						<FormButton
							caption="New Ingredient"
							onClick={handleCancel}
						/>
						<FormButton
							caption="New UOM"
							onClick={handleRecipeSave}
						/>
						<FormButton
							caption="Cancel"
							onClick={handleCancel}
						/>
						<FormButton
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
					{recipe.image === '' ? (
						<div className="empty-image-container">
							Click To Upload Image
							<FormButton
								caption={''}
								onClick={openFileChooser}
							>
								<FontAwesomeIcon icon={faImage} />
							</FormButton>
						</div>
					) : (
						<div className="image-container">
							<ImageWrapper
								src={recipe.image || ''}
								alt="Image Preview"
								width={500}
								height={500}
							/>
							<div
								role="button"
								onClick={openFileChooser}
								className="upload-preview"
							>
								<FontAwesomeIcon icon={faImage} />
							</div>
						</div>
					)}
					<input
						type="file"
						accept="image/*"
						ref={fileInputRef}
						onChange={handleImageSelection}
						hidden
					/>
					<div className="ingredient-list">
						<h5>Ingredients:</h5>
						<ul>
							{recipe.ingredients.map((ingredient) => {
								return <li key={ingredient.id}>{ingredient.quantity}</li>;
							})}
						</ul>
					</div>
				</div>
				<div className="ingredient-row">
					<SelectBox
						dataSource={ingredients}
						value={recipeIngredient?.ingredientId}
						caption="Ingredient"
						valueField="id"
						displayField="ingredientName"
						onValueChanged={() => console.log('ingredient select')}
					/>
					<SelectBox
						dataSource={unitsOfMeasure}
						value={recipeIngredient?.unitOfMeasureId}
						caption="UOM"
						valueField="id"
						displayField="unitOfMeasureCode"
						onValueChanged={() => console.log('select uom')}
					/>
					<TextBox
						label="Quantity"
						type="number"
						onValueChanged={handleQuantityChanged}
					/>
					<FormButton
						caption="Add"
						onClick={handleAddIngredient}
					/>
				</div>
				<TinyMceEditor />
			</div>
		</Form>
	);
};

export default RecipeForm;
