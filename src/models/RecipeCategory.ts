import Recipe from './Recipe';

interface RecipeCategory {
	id: string;
	userId: string;
	categoryName: string;
	image: string | undefined;
	description: string;
	recipes?: Recipe[];
}

export default RecipeCategory;
