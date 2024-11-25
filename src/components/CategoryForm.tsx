import React, { useEffect, useRef, useState } from 'react';
import Form from './wrapper-components/Form';
import ImageWrapper from './wrapper-components/ImageWrapper';
import TextBox from './wrapper-components/TextBox';
import RecipeCategory from '../models/RecipeCategory';
import TextArea from './wrapper-components/TextArea';
import './CategoryForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import FormButton from './wrapper-components/FormButton';
import {
	CheckImageExists,
	CreateCategory,
	GetImageUrl,
	RemoveImageFromSupabase,
	UpdateCategoryById,
	UploadImageToSupabase,
} from '../services/RecipeService';
import FormButtons from './wrapper-components/FormButtons';
import { useGlobalContext } from '../GlobalContextProvider';
import { toast } from 'react-toastify';

interface CategoryFormProps {
	recipeCategory?: RecipeCategory;
	onModalClosed: () => void;
}

const CategoryForm: React.FunctionComponent<CategoryFormProps> = ({
	recipeCategory,
	onModalClosed,
}) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const { user } = useGlobalContext();

	const [selectedImage, setSelectedImage] = useState<string>('');

	const [category, setCategory] = useState<RecipeCategory>({
		id: '',
		userId: user?.id || '',
		categoryName: '',
		image: '',
		description: '',
		recipes: [],
	});

	useEffect(() => {
		if (recipeCategory) {
			setCategory(recipeCategory);
		}
	}, [recipeCategory]);

	useEffect(() => {
		const getImageFromSupabase = async () => {
			if (selectedImage !== '') {
				await GetImageUrl(selectedImage).then((response) => {
					if (response.data) {
						const categ = { ...category, image: response.data };
						setCategory(categ);
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
			const categ = { ...category, categoryName: e.target.value };
			setCategory(categ);
		}
	};

	const handleDescriptionChange = (e: any) => {
		if (e) {
			const categ = { ...category, description: e.target.value };
			setCategory(categ);
		}
	};

	const handleCancel = () => {
		onModalClosed();
	};
	const handleCategorySave = () => {
		if (category.id === '') {
			CreateCategory(category).then((response) => {
				if (response.statusCode === 201) {
					toast.success('Category successfully created!');
					onModalClosed();
				} else if (response.error) {
					toast.error(`Failed to create category! ${response.error}`);
				}
			});
		} else {
			UpdateCategoryById(category).then((response) => {
				if (response.statusCode === 204) {
					onModalClosed();
					toast.success('Category successfully updated!');
				} else if (response.error) {
					toast.error(`Failed to update category! ${response.error}`);
				}
			});
		}
	};

	return (
		<Form>
			<div className="category-form">
				{category.image === '' ? (
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
							src={category.image || ''}
							alt="Image Preview"
							width={250}
							height={250}
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
				<div className="field-container">
					<TextBox
						label="Name"
						value={category.categoryName}
						onValueChanged={handleNameChanged}
					/>
					<TextArea
						cols={52}
						rows={7}
						placeholder="Add description..."
						resize={false}
						onValueChanged={handleDescriptionChange}
						value={category.description}
					/>
				</div>
				<input
					type="file"
					accept="image/*"
					ref={fileInputRef}
					onChange={handleImageSelection}
					hidden
				/>
			</div>
			<FormButtons>
				<FormButton
					caption="Cancel"
					onClick={handleCancel}
				/>
				<FormButton
					caption="Save"
					onClick={handleCategorySave}
				/>
			</FormButtons>
		</Form>
	);
};

export default CategoryForm;
