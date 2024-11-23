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
	CreateCategory,
	GetImageUrl,
	RemoveImageFromSupabase,
	UploadImageToSupabase,
} from '../services/RecipeService';
import ServiceResponse from '../models/ServiceResponse';
import FormButtons from './wrapper-components/FormButtons';
import { useGlobalContext } from '../GlobalContextProvider';

const CategoryForm = () => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const { onModalClosed, user } = useGlobalContext();

	const [selectedImage, setSelectedImage] = useState<File | null>(null);

	const [category, setCategory] = useState<RecipeCategory>({
		id: '',
		userId: user?.id || '',
		categoryName: '',
		image: '',
		description: '',
		recipes: [],
	});

	const getImageFromSupabase = async () => {
		const response: ServiceResponse = await GetImageUrl(
			selectedImage?.name || ''
		);
		console.log(response.data);
		if (response.data) {
			const categ = { ...category, image: response.data };
			setCategory(categ);
		}
	};

	useEffect(() => {
		getImageFromSupabase();
	}, [selectedImage]);

	const openFileChooser = () => {
		fileInputRef?.current?.click();
	};

	const handleImageSelection = async (e: any) => {
		const file = e.target.files[0];
		if (selectedImage) {
			await RemoveImageFromSupabase(selectedImage.name);
		}

		if (file) {
			setSelectedImage(file);

			const response: ServiceResponse = await UploadImageToSupabase(file);
			console.log(response);
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
	const onCategorySave = async (): Promise<void> => {
		await CreateCategory(category);
		onModalClosed();
	};

	const handleCategorySave = () => {
		onCategorySave();
	};

	return (
		<Form>
			<div className="category-form">
				{!selectedImage ? (
					<div className="empty-image-container">
						Click To Upload Image
						<FormButton
							caption={''}
							onClick={openFileChooser}
						>
							<FontAwesomeIcon icon={faImage} />
							<input
								type="file"
								accept="image/*"
								ref={fileInputRef}
								onChange={handleImageSelection}
								hidden
							/>
						</FormButton>
					</div>
				) : (
					<div className="image-container">
						<ImageWrapper
							src={URL.createObjectURL(selectedImage)}
							alt="Image Preview"
							width={300}
							height={200}
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
						rows={5}
						placeholder="Add description..."
						resize={false}
						onValueChanged={handleDescriptionChange}
						value={category.description}
					/>
				</div>
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
