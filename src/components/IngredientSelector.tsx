import React, { useEffect, useState } from 'react';
import TextBox from './wrapper-components/TextBox';
import SelectBox from './wrapper-components/SelectBox';
import FormButton from './wrapper-components/FormButton';
import RecipeIngredient from '../models/RecipeIngredient';
import { useGlobalContext } from '../context/GlobalContextProvider';
import IngredientForm from './forms/IngredientForm';
import Ingredient from '../models/Ingredient';
import MessageBox from './wrapper-components/MessageBox';
import {
	DeleteIngredientById,
	DeleteUnitOfMeasureById,
} from '../services/RecipeService';
import { toast } from 'react-toastify';
import UnitOfMeasure from '../models/UnitOfMeasure';
import UnitOfMeasureForm from './forms/UnitOfMeasureForm';
import { deleteIngredient, deleteUoM } from '../services/Helper';

interface IngredientSelectorProps {
	onAddIngredientToList: (recipIngredient: RecipeIngredient) => void;
}

const defaultRecipeIngredient = {
	id: '',
	recipeId: '',
	ingredientId: '',
	unitOfMeasureId: '',
	quantity: 0,
};

const IngredientSelector: React.FunctionComponent<IngredientSelectorProps> = ({
	onAddIngredientToList,
}) => {
	const [recipeIngredient, setRecipeIngredient] = useState<RecipeIngredient>(
		defaultRecipeIngredient
	);

	const {
		state,
		onModalOpened,
		onModalClosed,
		getUnitsOfMeasure,
		getIngredients,
	} = useGlobalContext();
	const { ingredients, unitsOfMeasure } = state;

	useEffect(() => {}, [recipeIngredient]);

	const handleQuantityChanged = (e: any) => {
		if (e) {
			const recipIngr = { ...recipeIngredient, quantity: e.target.value };
			setRecipeIngredient(recipIngr);
		}
	};

	const handleIngredientChanged = (ingrId: string) => {
		const recipIngr = { ...recipeIngredient, ingredientId: ingrId };
		setRecipeIngredient(recipIngr);
	};

	const handleIngredientEdit = (ingredient: Ingredient) => {
		onModalOpened(
			'Edit Ingredient',
			<IngredientForm currentIngredient={ingredient} />
		);
	};

	const handleIngredientDelete = (ingredient: Ingredient) => {
		onModalOpened(
			'Delete Ingredient',
			<MessageBox
				message="Are you sure you want to delete this Ingredient?"
				onNoClicked={onModalClosed}
				onYesClicked={() =>
					deleteIngredient(ingredient, onModalClosed, getIngredients)
				}
			/>
		);
	};

	const handleUomChanged = (uomId: string) => {
		const recipIngr = { ...recipeIngredient, unitOfMeasureId: uomId };
		setRecipeIngredient(recipIngr);
	};

	const handleUomEdit = (uom: UnitOfMeasure) => {
		onModalOpened(
			'Edit Unit of Measure',
			<UnitOfMeasureForm currentUom={uom} />
		);
	};

	const handleUomDelete = (uom: UnitOfMeasure) => {
		onModalOpened(
			'Delete Unit of Measure',
			<MessageBox
				message="Are you sure you want to delete this Unit of Measure?"
				onNoClicked={() => onModalClosed()}
				onYesClicked={() => deleteUoM(uom, onModalClosed, getUnitsOfMeasure)}
			/>
		);
	};

	const handleAddIngredientToList = () => {
		onAddIngredientToList(recipeIngredient);
		setRecipeIngredient(defaultRecipeIngredient);
	};

	return (
		<div className="ingredient-row">
			<TextBox
				label="Quantity"
				type="number"
				onValueChanged={handleQuantityChanged}
				value={recipeIngredient.quantity}
				placeholder=""
			/>
			<SelectBox
				dataSource={unitsOfMeasure}
				value={recipeIngredient.unitOfMeasureId}
				caption="UoM"
				valueField="id"
				displayField="unitOfMeasureCode"
				showDelete
				showEdit
				onEditItem={handleUomEdit}
				onDeleteItem={handleUomDelete}
				onValueChanged={handleUomChanged}
			/>
			<SelectBox
				dataSource={ingredients}
				value={recipeIngredient.ingredientId}
				caption="Ingr."
				valueField="id"
				displayField="ingredientName"
				showDelete
				showEdit
				onEditItem={handleIngredientEdit}
				onDeleteItem={handleIngredientDelete}
				onValueChanged={handleIngredientChanged}
			/>
			<FormButton
				caption="Add Ingredient"
				onClick={handleAddIngredientToList}
			/>
		</div>
	);
};

export default IngredientSelector;
