import RecipeIngredient from './RecipeIngredient';

interface Recipe {
	id: string;
	userId: string;
	categoryId: string;
	recipeName: string;
	instructions: string;
	image: string;
	isFavorite: boolean;
	ingredients: RecipeIngredient[];
}

export default Recipe;
