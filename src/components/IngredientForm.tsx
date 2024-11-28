import React, { useState } from 'react';
import Form from './wrapper-components/Form';
import TextBox from './wrapper-components/TextBox';
import Ingredient from '../models/Ingredient';
import { useGlobalContext } from '../GlobalContextProvider';
import FormButtons from './wrapper-components/FormButtons';
import FormButton from './wrapper-components/FormButton';
import { CreateIngredient } from '../services/RecipeService';
import { toast } from 'react-toastify';

const IngredientForm = () => {
	const { user, onModalClosed } = useGlobalContext();
	const [ingredient, setIngredient] = useState<Ingredient>({
		id: '',
		userId: user?.id || '',
		ingredientName: '',
		description: '',
	});

	const handleCancel = () => {
		onModalClosed();
	};

	const handleNameChanged = (e: any) => {
		if (e) {
			const ingr = { ...ingredient, ingredientName: e.target.value };
			setIngredient(ingr);
		}
	};

	const handleDescriptionChanged = (e: any) => {
		if (e) {
			const ingr = { ...ingredient, description: e.target.value };
			setIngredient(ingr);
		}
	};

	const saveIngredient = async () => {
		await CreateIngredient(ingredient).then((response) => {
			if (response.statusCode === 201) {
				toast.success(
					`Ingredient ${ingredient.ingredientName} successfully created!`
				);
			} else if (response.error) {
				toast.error(`Failed to create ingredient. ${response.error}.`);
			}
		});
	};

	const handleIngredientSave = () => {
		saveIngredient();
		onModalClosed();
	};

	return (
		<Form>
			<TextBox
				label="Name"
				onValueChanged={handleNameChanged}
			/>
			<TextBox
				label="Description"
				onValueChanged={handleDescriptionChanged}
			/>
			<FormButtons>
				<FormButton
					caption="Cancel"
					onClick={handleCancel}
				/>
				<FormButton
					caption="Save"
					onClick={handleIngredientSave}
				/>
			</FormButtons>
		</Form>
	);
};

export default IngredientForm;
