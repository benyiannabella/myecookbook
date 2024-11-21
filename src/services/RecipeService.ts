import { supabase } from '../config/client';
import Ingredient from '../models/Ingredient';
import Recipe from '../models/Recipe';
import RecipeCategory from '../models/RecipeCategory';
import RecipeIngredient from '../models/RecipeIngredient';
import UnitOfMeasure from '../models/UnitOfMeasure';

export const GetCategoriesByUserId = async (userId: string) => {
	const { data, error } = await supabase
		.from('RecipeCategories')
		.select('*')
		.eq('userId', userId);
	if (data) console.log(data);
	if (error) console.log(error);
};

export const GetCategoryById = async (id: string) => {
	const { data, error } = await supabase
		.from('RecipeCategories')
		.select('*')
		.eq('id', id);
	if (data) console.log(data);
	if (error) console.log(error);
};

export const CreateCategory = async (category: RecipeCategory) => {
	const { data, error } = await supabase
		.from('RecipeCategories')
		.insert(category);
	if (data) console.log(data);
	if (error) console.log(error);
};

export const UpdateCategoryById = async (category: RecipeCategory) => {
	const { data, error } = await supabase
		.from('RecipeCategories')
		.update(category)
		.eq('id', category.id);
	if (data) console.log(data);
	if (error) console.log(error);
};

export const DeleteCategoryById = async (categoryId: string) => {
	const { data, error } = await supabase
		.from('RecipeCategories')
		.delete()
		.eq('id', categoryId);
	if (data) console.log(data);
	if (error) console.log(error);
};

export const GetRecipesByCategoryId = async (categoryId: string) => {
	const { data, error } = await supabase
		.from('Recipes')
		.select('*')
		.eq('categoryId', categoryId);
	if (data) console.log(data);
	if (error) console.log(error);
};

export const GetRecipeById = async (recipeId: string) => {
	const { data, error } = await supabase
		.from('Recipes')
		.select('*')
		.eq('id', recipeId);
	if (data) console.log(data);
	if (error) console.log(error);
};

export const CreateRecipe = async (
	recipe: Recipe,
	recipeIngredient: RecipeIngredient
) => {
	try {
		const { data: recip, error } = await supabase
			.from('Recipes')
			.insert(recipe);
		if (error) console.log(error);
		else {
			console.log(recip);

			const { data: recipIngr, error } = await supabase
				.from('RecipeIngredients')
				.insert(recipeIngredient);
			if (error) console.log(error);
			else console.log(recipIngr);
		}
	} catch (error) {
		console.log(error);
	}
};

export const UpdateRecipeById = async (recipe: Recipe) => {
	const { data, error } = await supabase
		.from('Recipes')
		.update(recipe)
		.eq('id', recipe.id);
	if (data) console.log(data);
	if (error) console.log(error);
};

export const DeleteRecipeById = async (recipeId: string) => {
	const { data, error } = await supabase
		.from('Recipes')
		.delete()
		.eq('id', recipeId);
	if (data) console.log(data);
	if (error) console.log(error);
};

export const GetAllIngredients = async () => {
	const { data, error } = await supabase.from('Ingredients').select('*');
	if (data) console.log(data);
	if (error) console.log(error);
};

export const GetIngredientById = async (ingredientId: string) => {
	const { data, error } = await supabase
		.from('Ingredients')
		.select('*')
		.eq('id', ingredientId);
	if (data) console.log(data);
	if (error) console.log(error);
};

export const CreateIngredient = async (ingredient: Ingredient) => {
	const { data, error } = await supabase.from('Ingredients').insert(ingredient);
	if (data) console.log(data);
	if (error) console.log(error);
};
export const UpdateIngredientById = async (ingredient: Ingredient) => {
	const { data, error } = await supabase
		.from('Ingredients')
		.update(ingredient)
		.eq('id', ingredient.id);
	if (data) console.log(data);
	if (error) console.log(error);
};

export const DeleteIngredientById = async (ingredientId: string) => {
	const { data, error } = await supabase
		.from('Ingredients')
		.delete()
		.eq('id', ingredientId);
	if (data) console.log(data);
	if (error) console.log(error);
};

export const GetAllUnitsOfMeasure = async () => {
	const { data, error } = await supabase.from('UnitsOfMeasure').select('*');
	if (data) console.log(data);
	if (error) console.log(error);
};

export const GetUnitOfMeasureById = async (uomId: string) => {
	const { data, error } = await supabase
		.from('UnitsOfMeasure')
		.select('*')
		.eq('id', uomId);
	if (data) console.log(data);
	if (error) console.log(error);
};

export const CreateUnitOfMeasure = async (uom: UnitOfMeasure) => {
	const { data, error } = await supabase.from('UnitsOfMeasure').insert(uom);
	if (data) console.log(data);
	if (error) console.log(error);
};

export const UpdateUnitOfMeasureById = async (uom: UnitOfMeasure) => {
	const { data, error } = await supabase
		.from('UnitsOfMeasure')
		.update(uom)
		.eq('id', uom.id);
	if (data) console.log(data);
	if (error) console.log(error);
};

export const DeleteUnitOfMeasureById = async (uomId: string) => {
	const { data, error } = await supabase
		.from('UnitsOfMeasure')
		.delete()
		.eq('id', uomId);
	if (data) console.log(data);
	if (error) console.log(error);
};
