interface RecipeIngredient {
	id: string;
	recipeId: string;
	ingredientId: string;
	unitOfMeasureId: string;
	quantity: number;
}

export default RecipeIngredient;
