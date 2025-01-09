import React, { useEffect, useState } from 'react';
import Form from '../wrapper-components/Form';
import TextBox from '../wrapper-components/TextBox';
import RecipeCategory from '../../models/RecipeCategory';
import TextArea from '../wrapper-components/TextArea';
import './CategoryForm.scss';
import FormButton from '../wrapper-components/FormButton';
import {
	CheckImageExists,
	CreateCategory,
	GetImageUrl,
	RemoveImageFromSupabase,
	UpdateCategoryById,
	UploadImageToSupabase,
} from '../../services/RecipeService';
import FormButtons from '../wrapper-components/FormButtons';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import { toast } from 'react-toastify';
import { RecipeActionType } from '../../reducer/RecipeReducer';
import ImageContainer from '../ImageContainer';
import { createCategory, updateCategory } from '../../services/Helper';

interface CategoryFormProps {
	recipeCategory?: RecipeCategory;
}

const CategoryForm: React.FunctionComponent<CategoryFormProps> = ({
	recipeCategory,
}) => {
	const { state, dispatch, onModalClosed, getCategories } = useGlobalContext();
	const [selectedImage, setSelectedImage] = useState<string>('');

	const { currentCategory } = state;

	useEffect(() => {
		if (recipeCategory) {
			dispatch({
				type: RecipeActionType.SetCurrentCategory,
				value: recipeCategory,
			});
		}
	}, [recipeCategory]);

	useEffect(() => {
		const getImageFromSupabase = async () => {
			if (selectedImage !== '') {
				await GetImageUrl(selectedImage).then((response) => {
					if (response.data) {
						const categ = { ...currentCategory, image: response.data };
						dispatch({
							type: RecipeActionType.SetCurrentCategory,
							value: categ,
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
			const categ = { ...currentCategory, categoryName: e.target.value };
			dispatch({
				type: RecipeActionType.SetCurrentCategory,
				value: categ,
			});
		}
	};

	const handleDescriptionChange = (e: any) => {
		if (e) {
			const categ = { ...currentCategory, description: e.target.value };
			dispatch({
				type: RecipeActionType.SetCurrentCategory,
				value: categ,
			});
		}
	};

	const handleCancel = () => {
		onModalClosed();
	};

	const handleCategorySave = () => {
		if (currentCategory.id === '') {
			createCategory(currentCategory);
		} else {
			updateCategory(currentCategory);
		}
		onModalClosed();
		getCategories();
	};

	return (
		<Form>
			<div className="category-form">
				<ImageContainer
					image={currentCategory.image || ''}
					onImageSelection={onImageSelection}
				/>
				<div className="field-container">
					<TextBox
						label="Name"
						value={currentCategory.categoryName}
						onValueChanged={handleNameChanged}
					/>
					<TextArea
						cols={52}
						rows={7}
						placeholder="Add description..."
						resize={false}
						onValueChanged={handleDescriptionChange}
						value={currentCategory.description}
					/>
				</div>
			</div>
			<FormButtons>
				<FormButton
					className="secondary-button"
					caption="Cancel"
					onClick={handleCancel}
				/>
				<FormButton
					className="new-button"
					caption="Save"
					onClick={handleCategorySave}
				/>
			</FormButtons>
		</Form>
	);
};

export default CategoryForm;
