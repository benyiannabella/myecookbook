import RecipeIngredient from './RecipeIngredient';

interface Recipe {
	id: string;
	userId: string;
	categoryId: string;
	recipeName: string;
	description: string;
	image: string;
	favorite: boolean;
	ingredients: RecipeIngredient[];
}

export default Recipe;
