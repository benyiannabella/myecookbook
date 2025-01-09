import React, { useEffect, useState } from 'react';
import ImageWrapper from './wrapper-components/ImageWrapper';
import Recipe from '../models/Recipe';
import Card from './wrapper-components/Card';
import RecipeIngredient from '../models/RecipeIngredient';
import { getRecipeIngredientsByRecipeId } from '../services/Helper';
import { useGlobalContext } from '../context/GlobalContextProvider';

interface RecipeDetailsProps {
	recipe: Recipe;
}
const RecipeDetails: React.FunctionComponent<RecipeDetailsProps> = ({
	recipe,
}) => {
	const { state } = useGlobalContext();
	const { ingredients, unitsOfMeasure } = state;

	const [recipeIngredients, setRecipeIngredients] = useState<
		RecipeIngredient[]
	>([]);

	useEffect(() => {
		getRecipeIngredientsByRecipeId(recipe.id, setRecipeIngredients);
	}, [recipe.id]);

	return (
		<Card className="recipe-card">
			<div className="recipe-card-top-container">
				<ImageWrapper
					src={recipe?.image || ''}
					alt={recipe?.recipeName}
					width="400"
					height="400"
				/>
				<div>
					<h4>Ingredients</h4>
					<ul>
						{recipeIngredients.map((ingredient) => {
							return (
								<li key={ingredient.id}>
									<span>
										{ingredient.quantity}{' '}
										{
											unitsOfMeasure.find(
												(u) => u.id === ingredient.unitOfMeasureId
											)?.unitOfMeasureCode
										}{' '}
										{
											ingredients.find((i) => i.id === ingredient.ingredientId)
												?.ingredientName
										}
									</span>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
		</Card>
	);
};

export default RecipeDetails;
