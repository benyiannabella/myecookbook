import { supabase } from '../config/client';
import Ingredient from '../models/Ingredient';
import Recipe from '../models/Recipe';
import RecipeCategory from '../models/RecipeCategory';
import RecipeIngredient from '../models/RecipeIngredient';
import ServiceResponse from '../models/ServiceResponse';
import UnitOfMeasure from '../models/UnitOfMeasure';

export const GetCategoriesByUserId = async (
	userId: string
): Promise<ServiceResponse> => {
	return await supabase
		.from('recipe_categories')
		.select('*')
		.eq('userId', userId);
};

export const GetCategoryById = async (id: string): Promise<ServiceResponse> => {
	return await supabase.from('recipe_categories').select('*').eq('id', id);
};

export const CreateCategory = async (
	category: RecipeCategory
): Promise<ServiceResponse> => {
	return await supabase.from('recipe_categories').insert({
		categoryName: category.categoryName,
		userId: category.userId,
		image: category.image,
		description: category.description,
	});
};

export const UpdateCategoryById = async (category: RecipeCategory) => {
	return await supabase
		.from('recipe_categories')
		.update({
			id: category.id,
			categoryName: category.categoryName,
			userId: category.userId,
			image: category.image,
			description: category.description,
		})
		.eq('id', category.id);
};

export const DeleteCategoryById = async (
	categoryId: string
): Promise<ServiceResponse> => {
	return await supabase.from('recipe_categories').delete().eq('id', categoryId);
};

export const GetRecipesByCategoryId = async (
	categoryId: string
): Promise<ServiceResponse> => {
	return await supabase
		.from('recipes')
		.select('*')
		.eq('categoryId', categoryId);
};

export const GetRecipeById = async (
	recipeId: string
): Promise<ServiceResponse> => {
	return await supabase.from('recipes').select('*').eq('id', recipeId);
};

export const CreateRecipe = async (
	recipe: Recipe,
	recipeIngredient: RecipeIngredient
): Promise<ServiceResponse> => {
	const response: ServiceResponse = await supabase
		.from('recipes')
		.insert(recipe);
	if (response.data) {
		const { data: recipIngr, error } = await supabase
			.from('recipe_ingredients')
			.insert(recipeIngredient);
		if (error) console.log(error);
		else console.log(recipIngr);
	}
	return response;
};

export const UpdateRecipeById = async (
	recipe: Recipe
): Promise<ServiceResponse> => {
	return await supabase.from('recipes').update(recipe).eq('id', recipe.id);
};

export const DeleteRecipeById = async (
	recipeId: string
): Promise<ServiceResponse> => {
	return await supabase.from('recipes').delete().eq('id', recipeId);
};

export const GetAllIngredients = async () => {
	return await supabase.from('ingredients').select('*');
};

export const GetIngredientById = async (
	ingredientId: string
): Promise<ServiceResponse> => {
	return await supabase.from('ingredients').select('*').eq('id', ingredientId);
};

export const CreateIngredient = async (
	ingredient: Ingredient
): Promise<ServiceResponse> => {
	return await supabase.from('ingredients').insert(ingredient);
};
export const UpdateIngredientById = async (ingredient: Ingredient) => {
	return await supabase
		.from('ingredients')
		.update(ingredient)
		.eq('id', ingredient.id);
};

export const DeleteIngredientById = async (
	ingredientId: string
): Promise<ServiceResponse> => {
	return await supabase.from('ingredients').delete().eq('id', ingredientId);
};

export const GetAllUnitsOfMeasure = async (): Promise<ServiceResponse> => {
	return await supabase.from('units_of_measure').select('*');
};

export const GetUnitOfMeasureById = async (
	uomId: string
): Promise<ServiceResponse> => {
	return await supabase.from('units_of_measure').select('*').eq('id', uomId);
};

export const CreateUnitOfMeasure = async (
	uom: UnitOfMeasure
): Promise<ServiceResponse> => {
	return await supabase.from('units_of_measure').insert(uom);
};

export const UpdateUnitOfMeasureById = async (
	uom: UnitOfMeasure
): Promise<ServiceResponse> => {
	return await supabase.from('units_of_measure').update(uom).eq('id', uom.id);
};

export const DeleteUnitOfMeasureById = async (
	uomId: string
): Promise<ServiceResponse> => {
	return await supabase.from('units_of_measure').delete().eq('id', uomId);
};

export const UploadImageToSupabase = async (
	image: File
): Promise<ServiceResponse> => {
	return await supabase.storage
		.from('project_images')
		.upload(`public/${image.name}`, image);
};

export const RemoveImageFromSupabase = async (
	imageUrl: string
): Promise<ServiceResponse> => {
	return await supabase.storage
		.from('project_images')
		.remove([`public/${imageUrl}`]);
};

export const GetImageUrl = async (
	imageName: string
): Promise<ServiceResponse> => {
	const response = supabase.storage
		.from('project_images')
		.getPublicUrl(`public/${imageName}`);

	return { data: response.data.publicUrl, error: null };
};
