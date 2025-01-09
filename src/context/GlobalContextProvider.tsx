import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
} from 'react';

import { toast } from 'react-toastify';
import RecipeReducer, {
	RecipeAction,
	RecipeActionType,
	RecipeState,
} from '../reducer/RecipeReducer';
import RecipeCategory from '../models/RecipeCategory';
import Recipe from '../models/Recipe';
import Ingredient from '../models/Ingredient';
import UnitOfMeasure from '../models/UnitOfMeasure';
import { supabase } from '../config/client';
import {
	GetAllIngredients,
	GetAllUnitsOfMeasure,
	GetCategoriesByUserId,
	GetRecipesByCategoryId,
} from '../services/RecipeService';

interface ContextType {
	state: RecipeState;
	dispatch: React.Dispatch<RecipeAction>;
	onModalOpened: (title: string, content: React.ReactNode) => void;
	onModalClosed: () => void;
	onRegister: (email: string, password: string) => void;
	onSignIn: (email: string, password: string) => void;
	onSignOut: () => void;
	getCategories: () => Promise<void>;
	getIngredients: () => Promise<void>;
	getUnitsOfMeasure: () => Promise<void>;
	getRecipes: (categoryId: string) => Promise<void>;
}

const GlobalContext = createContext<ContextType | undefined>(undefined);

export const useGlobalContext = () => {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error('Context undefined');
	}
	return context;
};

interface GlobalContextProviderProps {
	children: React.ReactNode;
}

const initialRecipeState: RecipeState = {
	user: undefined,
	isAuthenticated: false,
	showModal: false,
	modalContent: undefined,
	categories: [] as RecipeCategory[],
	currentCategory: {
		id: '',
		userId: '',
		categoryName: '',
		image: '',
		description: '',
		recipes: [],
	},
	ingredients: [] as Ingredient[],
	unitsOfMeasure: [] as UnitOfMeasure[],
	recipes: [] as Recipe[],
	currentRecipe: {
		id: '',
		userId: '',
		categoryId: '',
		recipeName: '',
		instructions: '',
		image: '',
		isFavorite: false,
		ingredients: [],
	},
};

const GlobalContextProvider: React.FunctionComponent<
	GlobalContextProviderProps
> = ({ children }) => {
	const [state, dispatch] = useReducer(RecipeReducer, initialRecipeState);

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') {
				dispatch({
					type: RecipeActionType.SetAuth,
					value: { user: session?.user, auth: true },
				});

				getCategories();
				getIngredients();
				getUnitsOfMeasure();
			} else if (event === 'SIGNED_OUT') {
				dispatch({
					type: RecipeActionType.SetAuth,
					value: { user: undefined, auth: false },
				});
			}
		});
		return () => {
			data.subscription.unsubscribe();
		};
	}, []);

	const getCategories = useCallback(async () => {
		if (state.user) {
			const response = await GetCategoriesByUserId(state.user?.id);
			if (response.data) {
				dispatch({
					type: RecipeActionType.SetCategories,
					value: response.data,
				});
			} else {
				toast.error(`Failed to get categories ${response.error}`);
			}
		}
	}, [state.user]);

	const getIngredients = async () => {
		await GetAllIngredients().then((response) => {
			if (response.data) {
				dispatch({
					type: RecipeActionType.SetIngredients,
					value: response.data,
				});
			} else if (response.error) {
				toast.error(`Failed to get ingredients. ${response.error}`);
			}
		});
	};

	const getUnitsOfMeasure = async () => {
		await GetAllUnitsOfMeasure().then((response) => {
			if (response.data) {
				dispatch({
					type: RecipeActionType.SetUnitsOfMeasure,
					value: response.data,
				});
			} else if (response.error) {
				toast.error(`Failed to get units of measure. ${response.error}`);
			}
		});
	};

	const getRecipes = async (categoryId: string) => {
		await GetRecipesByCategoryId(categoryId || '').then((response) => {
			if (response.data) {
				dispatch({
					type: RecipeActionType.SetRecipes,
					value: response.data,
				});
			}
		});
	};

	const onSignIn = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			toast.error(`Error signing in: ${error.message}`);
			return;
		} else if (data) {
			toast.success(`You have successfully signed in!`);
		}
	};

	const onRegister = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});
		if (error) {
			toast.error(`Error signing in: ${error.message}`);
			return;
		} else if (data) {
			toast.success(`You have successfully registered!`);
		}
	};

	const onSignOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Error signing out:', error.message);
			return;
		}
	};

	const onModalOpened = (title: string, content: React.ReactNode) => {
		dispatch({
			type: RecipeActionType.SetModal,
			value: { show: true, content: { title, content } },
		});
	};

	const onModalClosed = () => {
		dispatch({
			type: RecipeActionType.SetModal,
			value: { show: false, content: undefined },
		});
	};

	return (
		<GlobalContext.Provider
			value={{
				state,
				dispatch,
				onModalClosed,
				onModalOpened,
				onSignIn,
				onRegister,
				onSignOut,
				getCategories,
				getIngredients,
				getUnitsOfMeasure,
				getRecipes,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContextProvider;
