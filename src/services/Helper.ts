import { toast } from 'react-toastify';
import {
	CreateCategory,
	CreateIngredient,
	CreateRecipe,
	CreateRecipeIngredients,
	CreateUnitOfMeasure,
	DeleteCategoryById,
	DeleteIngredientById,
	DeleteRecipeById,
	DeleteUnitOfMeasureById,
	GetRecipeIngredientsByRecipeId,
	RemoveImageFromSupabase,
	UpdateCategoryById,
	UpdateIngredientById,
	UpdateRecipeById,
	UpdateUnitOfMeasureById,
} from './RecipeService';
import Recipe from '../models/Recipe';
import { RecipeAction, RecipeActionType } from '../reducer/RecipeReducer';
import { NavigateFunction } from 'react-router-dom';
import RecipeCategory from '../models/RecipeCategory';
import Ingredient from '../models/Ingredient';
import UnitOfMeasure from '../models/UnitOfMeasure';

export const GetImageNameFromUrl = (url: string): string => {
	return url?.split('/').at(-1) ?? '';
};

export const deleteRecipe = async (
	recipe: Recipe,
	navigate: NavigateFunction
) => {
	await DeleteRecipeById(recipe.id).then((response) => {
		if (response.statusCode === 204) {
			toast.success(`Recipe ${recipe.recipeName} successfully deleted.`);
			RemoveImageFromSupabase(GetImageNameFromUrl(recipe.image ?? '')).then(
				(res) => {
					if (res.error) {
						toast.error(`Failed to remove image from storage ${res.error}`);
					}
				}
			);
			navigate(`/categories/${recipe.categoryId}/recipes`);
		} else if (response.error) {
			toast.error(`Failed to delete ${recipe.recipeName}.${response.error}.`);
		}
	});
};

export const createRecipe = async (
	recipe: Recipe,
	dispatch: React.Dispatch<RecipeAction>,
	navigate: NavigateFunction
) => {
	await CreateRecipe(recipe).then((response) => {
		if (response.statusCode === 201 && response.data) {
			toast.success('Recipe successfully created!');
			const recipIngredients = recipe.ingredients.map((recIngr) => {
				return { ...recIngr, recipeId: response.data[0].id };
			});
			const recip = {
				...recipe,
				id: response.data[0].id,
				ingredients: recipIngredients,
			};
			dispatch({
				type: RecipeActionType.SetCurrentRecipe,
				value: recip,
			});

			CreateRecipeIngredients(recipIngredients, recip.id);

			navigate(`/categories/${recip.categoryId}/recipes/${recip.id}`);
		} else if (response.error) {
			toast.error(`Failed to create recipe! ${response.error}`);
		}
	});
};

export const updateRecipe = async (recipe: Recipe) => {
	await UpdateRecipeById(recipe).then((response) => {
		if (response.statusCode === 204) {
			toast.success('Recipe successfully updated!');
		} else if (response.error) {
			toast.error(`Failed to update recipe! ${response.error}`);
		}
	});
};

export const deleteCategory = async (category: RecipeCategory) => {
	await DeleteCategoryById(category?.id).then((response) => {
		if (response.statusCode === 204) {
			toast.success('Category deleted');

			RemoveImageFromSupabase(GetImageNameFromUrl(category.image ?? '')).then(
				(res) => {
					if (res.error) {
						toast.error(`Failed to remove image from storage ${res.error}`);
					}
				}
			);
		} else if (response.error) {
			toast.error(`Failed to delete category. ${response.error}!`);
		}
	});
};

export const createCategory = async (category: RecipeCategory) => {
	await CreateCategory(category).then((response) => {
		if (response.statusCode === 201) {
			toast.success('Category successfully created!');
		} else if (response.error) {
			toast.error(`Failed to create category! ${response.error}`);
		}
	});
};

export const updateCategory = async (category: RecipeCategory) => {
	await UpdateCategoryById(category).then((response) => {
		if (response.statusCode === 204) {
			toast.success('Category successfully updated!');
		} else if (response.error) {
			toast.error(`Failed to update category! ${response.error}`);
		}
	});
};

export const deleteIngredient = async (
	ingredient: Ingredient,
	onModalClosed: any,
	getIngredients: any
) => {
	await DeleteIngredientById(ingredient.id).then((response) => {
		if (response.statusCode === 204) {
			toast.success(
				`Ingredient ${ingredient.ingredientName} successfully deleted.`
			);
			onModalClosed();
			getIngredients();
		} else if (response.error) {
			toast.error(
				`Failed to delete ingredient ${ingredient.ingredientName}! ${response.error}`
			);
		}
	});
};

export const createIngredient = async (
	ingredient: Ingredient,
	getIngredients: any
) => {
	await CreateIngredient(ingredient).then((response) => {
		if (response.statusCode === 201) {
			toast.success(
				`Ingredient ${ingredient.ingredientName} successfully created!`
			);
			getIngredients();
		} else if (response.error) {
			toast.error(`Failed to create ingredient. ${response.error}.`);
		}
	});
};

export const updateIngredient = async (
	ingredient: Ingredient,
	getIngredients: any
) => {
	await UpdateIngredientById(ingredient).then((response) => {
		if (response.statusCode === 204) {
			toast.success(
				`Ingredient ${ingredient.ingredientName} successfully updated!`
			);
			getIngredients();
		} else if (response.error) {
			toast.error(`Failed to update ingredient. ${response.error}.`);
		}
	});
};

export const deleteUoM = async (
	uom: UnitOfMeasure,
	onModalClosed: any,
	getIngredients: any
) => {
	await DeleteUnitOfMeasureById(uom.id).then((response) => {
		if (response.statusCode === 204) {
			toast.success(
				`Unit of Measure ${uom.unitOfMeasureCode} successfully deleted.`
			);
			onModalClosed();
			getIngredients();
		} else if (response.error) {
			toast.error(
				`Failed to delete Unit of Measure ${uom.unitOfMeasureCode}! ${response.error}`
			);
		}
	});
};

export const createUoM = async (uom: UnitOfMeasure, getUnitsOfMeasure: any) => {
	await CreateUnitOfMeasure(uom).then((response) => {
		if (response.statusCode === 201) {
			toast.success(
				`Unit of Measure ${uom.unitOfMeasureCode} successfully created!`
			);
			getUnitsOfMeasure();
		} else if (response.error) {
			toast.error(`Failed to create unit of measure. ${response.error}.`);
		}
	});
};

export const updateUoM = async (uom: UnitOfMeasure, getUnitsOfMeasure: any) => {
	await UpdateUnitOfMeasureById(uom).then((response) => {
		if (response.statusCode === 204) {
			toast.success(
				`Unit of Measure ${uom.unitOfMeasureCode} successfully updated!`
			);
			getUnitsOfMeasure();
		} else if (response.error) {
			toast.error(`Failed to update Unit of Measure. ${response.error}.`);
		}
	});
};

export const getRecipeIngredientsByRecipeId = async (
	recipeId: string,
	setRecipeIngredients: any
) => {
	await GetRecipeIngredientsByRecipeId(recipeId).then((response) => {
		if (response.statusCode === 200) {
			setRecipeIngredients(response.data);
		} else if (response.error) {
			toast.error(`Failed to get ingredients for recipe.`);
		}
	});
};
