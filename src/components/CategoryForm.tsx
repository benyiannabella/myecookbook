import React, { useState } from 'react';
import Form from './wrapper-components/Form';
import ImageWrapper from './wrapper-components/ImageWrapper';
import TextBox from './wrapper-components/TextBox';
import RecipeCategory from '../models/RecipeCategory';
import TextArea from './wrapper-components/TextArea';

const CategoryForm = () => {
	const [category, setCategory] = useState<RecipeCategory>({
		id: '1',
		userId: '2',
		categoryName: '',
		image: '',
		description: '',
		recipes: [],
	});

	return (
		<div className="category-form">
			<Form>
				<ImageWrapper
					src={''}
					alt={''}
				/>
				<div className="field-container">
					<TextBox
						label="Category Name"
						value={category.categoryName}
						onValueChanged={(e: any) =>
							console.log('Function not implemented.')
						}
					/>
					<TextArea
						cols={52}
						placeholder="Add description..."
					/>
				</div>
			</Form>
		</div>
	);
};

export default CategoryForm;
