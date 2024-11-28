import { error } from 'console';
import { supabase } from '../config/client';
import Ingredient from '../models/Ingredient';
import Recipe from '../models/Recipe';
import RecipeCategory from '../models/RecipeCategory';
import RecipeIngredient from '../models/RecipeIngredient';
import ServiceResponse from '../models/ServiceResponse';
import UnitOfMeasure from '../models/UnitOfMeasure';
import UnitOfMeasureForm from '../components/UnitOfMeasureForm';

export const GetCategoriesByUserId = async (
	userId: string
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('recipe_categories')
		.select('*')
		.eq('userId', userId);
	return { statusCode: status, data, error };
};

export const GetCategoryById = async (id: string): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('recipe_categories')
		.select('*')
		.eq('id', id);
	return { statusCode: status, data, error };
};

export const CreateCategory = async (
	category: RecipeCategory
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('recipe_categories')
		.insert({
			categoryName: category.categoryName,
			userId: category.userId,
			image: category.image,
			description: category.description,
		});
	return { statusCode: status, data, error };
};

export const UpdateCategoryById = async (category: RecipeCategory) => {
	const { status, data, error } = await supabase
		.from('recipe_categories')
		.update({
			id: category.id,
			categoryName: category.categoryName,
			userId: category.userId,
			image: category.image,
			description: category.description,
		})
		.eq('id', category.id);
	return { statusCode: status, data, error };
};

export const DeleteCategoryById = async (
	categoryId: string
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('recipe_categories')
		.delete()
		.eq('id', categoryId);
	return { statusCode: status, data, error };
};

export const GetRecipesByCategoryId = async (
	categoryId: string
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('recipes')
		.select('*')
		.eq('categoryId', categoryId);
	return { statusCode: status, data, error };
};

export const GetRecipeById = async (
	recipeId: string
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('recipes')
		.select('*')
		.eq('id', recipeId);
	return { statusCode: status, data, error };
};

export const CreateRecipe = async (
	recipe: Recipe
): Promise<ServiceResponse> => {
	const {
		status: recipeStatus,
		data: recipeData,
		error: recipeError,
	} = await supabase.from('recipes').insert(recipe);
	if (recipeStatus === 201) {
		const { status, data, error } = await supabase
			.from('recipe_ingredients')
			.insert(recipe.ingredients);

		return {
			statusCode: status,
			data: data,
			error: error,
		};
	} else {
		return { statusCode: recipeStatus, data: recipeData, error: recipeError };
	}
};

export const UpdateRecipeById = async (
	recipe: Recipe
): Promise<ServiceResponse> => {
	const {
		status: recipeStatus,
		data: recipeData,
		error: recipeError,
	} = await supabase.from('recipes').update(recipe).eq('id', recipe.id);
	if (recipeStatus === 204) {
		await supabase
			.from('recipe_ingredients')
			.delete()
			.eq('recipeid', recipe.id);

		const {
			status: statusIng,
			data: dataIngr,
			error: errorIngr,
		} = await supabase.from('recipe_ingredients').insert(recipe.ingredients);

		return {
			statusCode: statusIng,
			data: dataIngr,
			error: errorIngr,
		};
	} else {
		return { statusCode: recipeStatus, data: recipeData, error: recipeError };
	}
};

export const DeleteRecipeById = async (
	recipeId: string
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('recipes')
		.delete()
		.eq('id', recipeId);
	return { statusCode: status, data, error };
};

export const GetAllIngredients = async () => {
	const { status, data, error } = await supabase
		.from('ingredients')
		.select('*');
	return { statusCode: status, data, error };
};

export const GetIngredientById = async (
	ingredientId: string
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('ingredients')
		.select('*')
		.eq('id', ingredientId);
	return { statusCode: status, data, error };
};

export const CreateIngredient = async (
	ingredient: Ingredient
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('ingredients')
		.insert({ ingredient });
	return { statusCode: status, data, error };
};
export const UpdateIngredientById = async (ingredient: Ingredient) => {
	const { status, data, error } = await supabase
		.from('ingredients')
		.update(ingredient)
		.eq('id', ingredient.id);
	return { statusCode: status, data, error };
};

export const DeleteIngredientById = async (
	ingredientId: string
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('ingredients')
		.delete()
		.eq('id', ingredientId);
	return { statusCode: status, data, error };
};

export const GetAllUnitsOfMeasure = async (): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('units_of_measure')
		.select('*');
	return { statusCode: status, data, error };
};

export const GetUnitOfMeasureById = async (
	uomId: string
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('units_of_measure')
		.select('*')
		.eq('id', uomId);
	return { statusCode: status, data, error };
};

export const CreateUnitOfMeasure = async (
	uom: UnitOfMeasure
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('units_of_measure')
		.insert({
			userId: uom.userId,
			unitOfMeasureCode: uom.unitOfMeasureCode,
			description: uom.description,
		});
	return { statusCode: status, data, error };
};

export const UpdateUnitOfMeasureById = async (
	uom: UnitOfMeasure
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('units_of_measure')
		.update(uom)
		.eq('id', uom.id);
	return { statusCode: status, data, error };
};

export const DeleteUnitOfMeasureById = async (
	uomId: string
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('units_of_measure')
		.delete()
		.eq('id', uomId);
	return { statusCode: status, data, error };
};

export const UploadImageToSupabase = async (
	image: File
): Promise<ServiceResponse> => {
	const { data, error } = await supabase.storage
		.from('project_images')
		.upload(`public/${image.name}`, image);
	return { statusCode: null, data, error };
};

export const RemoveImageFromSupabase = async (
	imageUrl: string
): Promise<ServiceResponse> => {
	const { data, error } = await supabase.storage
		.from('project_images')
		.remove([`public/${imageUrl}`]);
	return { statusCode: null, data, error };
};

export const GetImageUrl = async (
	imageName: string
): Promise<ServiceResponse> => {
	const response = supabase.storage
		.from('project_images')
		.getPublicUrl(`public/${imageName}`);

	return { statusCode: null, data: response.data.publicUrl, error: null };
};

export const CheckImageExists = async (
	bucket: string,
	path: string
): Promise<boolean | null> => {
	const { data } = await supabase.storage.from(bucket).list('');
	const fileExists = data?.some((file) => file.name === path);
	return fileExists || null;
};
