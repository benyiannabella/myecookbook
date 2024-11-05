import Ingredient from './Ingredient';

interface Recipe {
	id: number;
	recipeName: string;
	category: string;
	description: string;
	image: string;
	ingredients: Ingredient[];
}

export default Recipe;
