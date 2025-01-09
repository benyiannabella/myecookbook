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
	const { status, data, error } = await supabase
		.from('recipes')
		.insert({
			userId: recipe.userId,
			categoryId: recipe.categoryId,
			recipeName: recipe.recipeName,
			instructions: recipe.instructions,
			image: recipe.image,
			isFavorite: recipe.isFavorite,
		})
		.select();
	return { statusCode: status, data, error };
};

export const CreateRecipeIngredients = async (
	recipeIngredients: RecipeIngredient[],
	recipeId: string
): Promise<ServiceResponse> => {
	const ingredients = recipeIngredients.map((recipeIngredient) => {
		return {
			recipeId,
			ingredientId: recipeIngredient.ingredientId,
			unitOfMeasureId: recipeIngredient.unitOfMeasureId,
			quantity: recipeIngredient.quantity,
		};
	});
	const { status, data, error } = await supabase
		.from('recipe_ingredients')
		.insert(ingredients);

	return {
		statusCode: status,
		data: data,
		error: error,
	};
};

export const UpdateRecipeById = async (
	recipe: Recipe
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('recipes')
		.update(recipe)
		.eq('id', recipe.id);
	if (status === 204) {
		await DeleteRecipeIngredientsByRecipeId(recipe.id).then((res) => {
			if (res.statusCode === 204) {
				CreateRecipeIngredients(recipe.ingredients, recipe.id);
			}
		});
	}
	return { statusCode: status, data, error };
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

export const DeleteRecipeIngredientsByRecipeId = async (
	recipeId: string
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('recipe_ingredients')
		.delete()
		.eq('recipeId', recipeId);
	return { statusCode: status, data, error };
};

export const GetRecipeIngredientsByRecipeId = async (
	recipeId: string
): Promise<ServiceResponse> => {
	const { status, data, error } = await supabase
		.from('recipe_ingredients')
		.select('*')
		.eq('recipeId', recipeId);
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
	const { status, data, error } = await supabase.from('ingredients').insert({
		ingredientName: ingredient.ingredientName,
		userId: ingredient.userId,
		description: ingredient.description,
	});
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
