import React, { useEffect, useState } from 'react';
import Form from '../wrapper-components/Form';
import TextBox from '../wrapper-components/TextBox';
import Ingredient from '../../models/Ingredient';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import FormButtons from '../wrapper-components/FormButtons';
import FormButton from '../wrapper-components/FormButton';
import {
	CreateIngredient,
	UpdateIngredientById,
} from '../../services/RecipeService';
import { toast } from 'react-toastify';

interface IngredientFormProps {
	currentIngredient?: Ingredient;
}

const IngredientForm: React.FunctionComponent<IngredientFormProps> = ({
	currentIngredient,
}) => {
	const { state, onModalClosed, getIngredients } = useGlobalContext();
	const [ingredient, setIngredient] = useState<Ingredient>({
		id: '',
		userId: state.user?.id || '',
		ingredientName: '',
		description: '',
	});

	useEffect(() => {
		if (currentIngredient) {
			setIngredient(currentIngredient);
		}
	}, [currentIngredient]);

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
		if (ingredient.id === '') {
			await CreateIngredient(ingredient).then((response) => {
				if (response.statusCode === 201) {
					toast.success(
						`Ingredient ${ingredient.ingredientName} successfully created!`
					);
					getIngredients();
				} else if (response.error) {
					toast.error(`Failed to create ingredient. ${response.error}.`);
				}
			});
		} else {
			await UpdateIngredientById(ingredient).then((response) => {
				if (response.statusCode === 204) {
					toast.success(
						`Ingredient ${ingredient.ingredientName} successfully updated!`
					);
					getIngredients();
				} else if (response.error) {
					toast.error(`Failed to update ingredient. ${response.error}.`);
				}
			});
		}
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
				value={ingredient.ingredientName}
			/>
			<TextBox
				label="Description"
				onValueChanged={handleDescriptionChanged}
				value={ingredient.description}
			/>
			<FormButtons>
				<FormButton
					className="secondary-button"
					caption="Cancel"
					onClick={handleCancel}
				/>
				<FormButton
					className="new-button"
					caption="Save"
					onClick={handleIngredientSave}
				/>
			</FormButtons>
		</Form>
	);
};

export default IngredientForm;
