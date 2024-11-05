import Recipe from './Recipe';

interface RecipeCategory {
	id: number;
	categoryName: string;
	image: string;
	description: string;
	recipes: Recipe[];
}

export default RecipeCategory;
