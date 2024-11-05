import RecipeCategory from '../models/RecipeCategory';
import Recipe from '../models/Recipe';
import Ingredient from '../models/Ingredient';
import Translation from '../models/Translation';
import { translations } from './translations';
import { recipeCategories } from './recipeCategories';

const getLocalStorageData = <T>(key: string, defaultValue: T): T => {
	const data = localStorage.getItem(key);
	return data ? JSON.parse(data) : defaultValue;
};
const setLocalStorageData = <T>(key: string, value: T): void => {
	localStorage.setItem(key, JSON.stringify(value));
};
const initialData = {
	recipeCategories: recipeCategories as RecipeCategory[],
	recipes: [] as Recipe[],
	ingredients: [] as Ingredient[],
	translations: translations as Translation[],
};

//CRUD operations
export const addRecipeCategory = (recipeCategory: RecipeCategory) => {
	const recipeCategories = getLocalStorageData(
		'recipeCategories',
		initialData.recipeCategories
	);
	recipeCategories.push(recipeCategory);
	setLocalStorageData('recipeCategories', recipeCategories);
};

export const getRecipeCategories = (): RecipeCategory[] => {
	return getLocalStorageData('recipeCategories', initialData.recipeCategories);
};

export const addRecipes = (recipe: Recipe) => {
	const recipes = getLocalStorageData('recipes', initialData.recipes);
	recipes.push(recipe);
	setLocalStorageData('recipes', recipes);
};

export const getRecipe = (): Recipe[] => {
	return getLocalStorageData('recipes', initialData.recipes);
};

export const addIngredient = (ingredient: Ingredient) => {
	const ingredients = getLocalStorageData(
		'ingredient',
		initialData.ingredients
	);
	ingredients.push(ingredient);
	setLocalStorageData('ingredients', ingredients);
};

export const getIngredients = (): Ingredient[] => {
	return getLocalStorageData('ingredients', initialData.ingredients);
};

export const getTranslations = (): Translation[] => {
	return getLocalStorageData('translations', initialData.translations);
};
