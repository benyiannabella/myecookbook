import React from 'react';
import FormButtons from '../components/FormButtons';
import './Recipes.scss';
import FormButton from '../components/FormButton';
import TextBox from '../components/TextBox';
import RecipeCategory from '../models/RecipeCategory';
import Accordion from '../components/Accordion';
import ImageWrapper from '../components/ImageWrapper';

interface RecipesProps {
	categories: RecipeCategory[];
}

const Recipes: React.FunctionComponent<RecipesProps> = ({ categories }) => {
	return (
		<div className="recipes-page">
			<FormButtons width="900">
				<FormButton
					caption="Add Category"
					onClick={() => console.log('click add cat')}
				/>
				<FormButton
					caption="Add Recipe"
					onClick={() => console.log('add recipe')}
				/>
				<TextBox
					label="Search Recipe"
					placeholder="Search recipe..."
					onValueChanged={() => console.log('value changed')}
				/>
			</FormButtons>
			<div className="category-container">
				{categories.length > 0 ? (
					categories.map((category: RecipeCategory) => {
						return (
							<Accordion
								key={category.id}
								title={category.categoryName}
							>
								<ImageWrapper
									src={category.image}
									alt={category.categoryName}
									width="300"
									height="300"
								/>
								<span>{category.description}</span>
							</Accordion>
						);
					})
				) : (
					<div className="category-not-found">No Recipe Category Found</div>
				)}
			</div>
		</div>
	);
};

export default Recipes;
