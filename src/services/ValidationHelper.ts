import { ValidationConfig } from '../models/ValidationResult';

export const loginFormValidation: ValidationConfig = {
	email: {
		required: true,
		pattern: /\S+@\S+\.\S+/,
		message: 'Email is required and must be valid',
	},
	password: {
		required: true,
		pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/,
		minLength: 8,
		message:
			'Password is required and must be at least 8 characters, to include numbers and special characters.',
	},
};

export const ingredientFormValidation: ValidationConfig = {
	ingredientName: {
		required: true,
		message: 'Ingredient Name is required',
	},
};

export const uomFormValidation: ValidationConfig = {
	unitOfMeasureCode: {
		required: true,
		message: 'Unit of Measure code is required',
	},
};

export const categoryFormValidation: ValidationConfig = {
	categoryName: {
		required: true,
		message: 'Category Name is required',
	},
};

export const recipeFormValidation: ValidationConfig = {
	recipeName: {
		required: true,
		message: 'Recipe Name is required',
	},
};
