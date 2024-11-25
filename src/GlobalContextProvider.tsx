import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { supabase } from './config/client';
import { User } from '@supabase/supabase-js';
import ModalContent from './models/ModalContent';
import Ingredient from './models/Ingredient';
import UnitOfMeasure from './models/UnitOfMeasure';
import {
	GetAllIngredients,
	GetAllUnitsOfMeasure,
	GetCategoriesByUserId,
} from './services/RecipeService';
import { toast } from 'react-toastify';
import RecipeCategory from './models/RecipeCategory';

interface ContextType {
	user: User | undefined;
	isAuthenticated: boolean;
	showModal: boolean;
	modalContent: ModalContent | undefined;
	ingredients: Ingredient[];
	unitsOfMeasure: UnitOfMeasure[];
	categories: RecipeCategory[];
	getCategories: () => Promise<void>;
	onModalOpened: (title: string, content: React.ReactNode) => void;
	onModalClosed: () => void;
	onRegister: (email: string, password: string) => void;
	onSignIn: (email: string, password: string) => void;
	onSignOut: () => void;
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

const GlobalContextProvider: React.FunctionComponent<
	GlobalContextProviderProps
> = ({ children }) => {
	const [user, setUser] = useState<User | undefined>();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState<ModalContent | undefined>();
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [unitsOfMeasure, setUnitsOfMeasure] = useState<UnitOfMeasure[]>([]);
	const [categories, setCategories] = useState<RecipeCategory[]>([]);

	const getCategories = useCallback(async () => {
		if (user) {
			const response = await GetCategoriesByUserId(user?.id);
			if (response.data) {
				setCategories(response.data);
			} else {
				toast.error(`Failed to get categories ${response.error}`);
			}
		}
	}, [user]);

	const getIngredients = async () => {
		await GetAllIngredients().then((response) => {
			if (response.data) {
				setIngredients(response.data);
			} else if (response.error) {
				toast.error(`Failed to get ingredients. ${response.error}`);
			}
		});
	};

	const getUnitsOfMeasure = async () => {
		await GetAllUnitsOfMeasure().then((response) => {
			if (response.data) {
				setUnitsOfMeasure(response.data);
			} else if (response.error) {
				toast.error(`Failed to get units of measure. ${response.error}`);
			}
		});
	};

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') {
				setUser(session?.user);
				setIsAuthenticated(true);

				getIngredients();
				getUnitsOfMeasure();
				getCategories();
			} else if (event === 'SIGNED_OUT') {
				setUser(undefined);
				setIsAuthenticated(false);
			}
		});
		return () => {
			data.subscription.unsubscribe();
		};
	}, [getCategories]);

	const onSignIn = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			console.error('Error signing in:', error.message);
			return;
		}
		const { user, session } = data;
		console.log('Signed in user:', user);
		console.log('Session details:', session);
	};

	const onRegister = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});
		if (error) {
			console.error('Error signing up:', error.message);
			return;
		}
		const { user, session } = data;
		console.log('Signed up user:', user);
		console.log('Session details:', session);
	};

	const onSignOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Error signing out:', error.message);
			return;
		}
	};

	const onModalOpened = (title: string, content: React.ReactNode) => {
		setModalContent({ title, content });
		setShowModal(true);
	};

	const onModalClosed = () => {
		setShowModal(false);
		setModalContent(undefined);
	};

	return (
		<GlobalContext.Provider
			value={{
				user,
				isAuthenticated,
				showModal,
				modalContent,
				ingredients,
				unitsOfMeasure,
				categories,
				getCategories,
				onModalClosed,
				onModalOpened,
				onSignIn,
				onRegister,
				onSignOut,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContextProvider;
