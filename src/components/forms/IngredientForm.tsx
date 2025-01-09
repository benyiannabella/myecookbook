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
import { createIngredient, updateIngredient } from '../../services/Helper';

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

	const handleIngredientSave = () => {
		if (ingredient.id === '') {
			createIngredient(ingredient, getIngredients);
		} else {
			updateIngredient(ingredient, getIngredients);
		}
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
