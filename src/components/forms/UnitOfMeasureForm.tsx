import React, { useEffect, useState } from 'react';
import Form from '../wrapper-components/Form';
import TextBox from '../wrapper-components/TextBox';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import FormButtons from '../wrapper-components/FormButtons';
import FormButton from '../wrapper-components/FormButton';
import UnitOfMeasure from '../../models/UnitOfMeasure';
import {
	CreateUnitOfMeasure,
	UpdateUnitOfMeasureById,
} from '../../services/RecipeService';
import { toast } from 'react-toastify';
import { createUoM, updateUoM } from '../../services/Helper';

interface UnitOfMeasureFormProps {
	currentUom?: UnitOfMeasure;
}

const UnitOfMeasureForm: React.FunctionComponent<UnitOfMeasureFormProps> = ({
	currentUom,
}) => {
	const { state, onModalClosed, getUnitsOfMeasure } = useGlobalContext();
	const [uom, setUom] = useState<UnitOfMeasure>({
		id: '',
		userId: state.user?.id || '',
		unitOfMeasureCode: '',
		description: '',
	});

	useEffect(() => {
		if (currentUom) {
			setUom(currentUom);
		}
	}, [currentUom]);

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

	const handleUomSave = () => {
		if (uom.id === '') {
			createUoM(uom, getUnitsOfMeasure);
		} else {
			updateUoM(uom, getUnitsOfMeasure);
		}
		onModalClosed();
	};

	return (
		<Form>
			<TextBox
				label="Name"
				onValueChanged={handleNameChanged}
				value={uom.unitOfMeasureCode}
			/>
			<TextBox
				label="Description"
				onValueChanged={handleDescriptionChanged}
				value={uom.description}
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
					onClick={handleUomSave}
				/>
			</FormButtons>
		</Form>
	);
};

export default UnitOfMeasureForm;
