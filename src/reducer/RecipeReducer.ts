import { User } from '@supabase/supabase-js';
import Ingredient from '../models/Ingredient';
import RecipeCategory from '../models/RecipeCategory';
import UnitOfMeasure from '../models/UnitOfMeasure';
import ModalContent from '../models/ModalContent';
import Recipe from '../models/Recipe';

export interface RecipeState {
	user: User | undefined;
	isAuthenticated: boolean;
	showModal: boolean;
	modalContent: ModalContent | undefined;
	categories: RecipeCategory[];
	currentCategory: RecipeCategory;
	ingredients: Ingredient[];
	unitsOfMeasure: UnitOfMeasure[];
	recipes: Recipe[];
	currentRecipe: Recipe;
}

export enum RecipeActionType {
	'SetAuth',
	'SetModal',
	'SetCategories',
	'SetCurrentCategory',
	'SetIngredients',
	'SetUnitsOfMeasure',
	'SetRecipes',
	'SetCurrentRecipe',
}

export type RecipeAction =
	| {
			type: RecipeActionType.SetAuth;
			value: { user: User | undefined; auth: boolean };
	  }
	| {
			type: RecipeActionType.SetModal;
			value: { show: boolean; content: ModalContent | undefined };
	  }
	| {
			type: RecipeActionType.SetCategories;
			value: RecipeCategory[];
	  }
	| {
			type: RecipeActionType.SetCurrentCategory;
			value: RecipeCategory;
	  }
	| {
			type: RecipeActionType.SetIngredients;
			value: Ingredient[];
	  }
	| {
			type: RecipeActionType.SetUnitsOfMeasure;
			value: UnitOfMeasure[];
	  }
	| {
			type: RecipeActionType.SetRecipes;
			value: Recipe[];
	  }
	| {
			type: RecipeActionType.SetCurrentRecipe;
			value: Recipe;
	  };

const RecipeReducer: React.Reducer<RecipeState, RecipeAction> = (
	state: RecipeState,
	action: RecipeAction
) => {
	switch (action.type) {
		case RecipeActionType.SetAuth:
			state = {
				...state,
				user: action.value.user,
				isAuthenticated: action.value.auth,
			};
			break;
		case RecipeActionType.SetModal:
			state = {
				...state,
				showModal: action.value.show,
				modalContent: action.value.content,
			};
			break;
		case RecipeActionType.SetCategories:
			state = { ...state, categories: action.value };
			break;
		case RecipeActionType.SetCurrentCategory:
			state = { ...state, currentCategory: action.value };
			break;
		case RecipeActionType.SetIngredients:
			state = { ...state, ingredients: action.value };
			break;
		case RecipeActionType.SetUnitsOfMeasure:
			state = { ...state, unitsOfMeasure: action.value };
			break;
		case RecipeActionType.SetRecipes:
			state = { ...state, recipes: action.value };
			break;
		case RecipeActionType.SetCurrentRecipe:
			state = { ...state, currentRecipe: action.value };
			break;
	}
	return state;
};

export default RecipeReducer;
