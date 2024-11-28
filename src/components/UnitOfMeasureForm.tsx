import React, { useState } from 'react';
import Form from './wrapper-components/Form';
import TextBox from './wrapper-components/TextBox';
import { useGlobalContext } from '../GlobalContextProvider';
import FormButtons from './wrapper-components/FormButtons';
import FormButton from './wrapper-components/FormButton';
import UnitOfMeasure from '../models/UnitOfMeasure';
import { CreateUnitOfMeasure } from '../services/RecipeService';
import { toast } from 'react-toastify';

const UnitOfMeasureForm = () => {
	const { user, onModalClosed } = useGlobalContext();
	const [uom, setUom] = useState<UnitOfMeasure>({
		id: '',
		userId: user?.id || '',
		unitOfMeasureCode: '',
		description: '',
	});

	const handleCancel = () => {
		onModalClosed();
	};

	const handleNameChanged = (e: any) => {
		if (e) {
			const unit = { ...uom, unitOfMeasureCode: e.target.value };
			setUom(unit);
		}
	};

	const handleDescriptionChanged = (e: any) => {
		if (e) {
			const unit = { ...uom, description: e.target.value };
			setUom(unit);
		}
	};

	const saveUom = async () => {
		await CreateUnitOfMeasure(uom).then((response) => {
			if (response.statusCode === 201) {
				toast.success(
					`Ingredient ${uom.unitOfMeasureCode} successfully created!`
				);
			} else if (response.error) {
				toast.error(`Failed to create unit of measure. ${response.error}.`);
			}
		});
	};

	const handleUomSave = (e: any) => {
		saveUom();
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
					onClick={handleUomSave}
				/>
			</FormButtons>
		</Form>
	);
};

export default UnitOfMeasureForm;
