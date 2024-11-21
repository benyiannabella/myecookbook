import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './config/client';
import { User } from '@supabase/supabase-js';
import ModalContent from './models/ModalContent';

interface ContextType {
	user: User | undefined;
	isAuthenticated: boolean;
	showModal: boolean;
	modalContent: ModalContent | undefined;
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

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') {
				setUser(session?.user);
				setIsAuthenticated(true);
			} else if (event === 'SIGNED_OUT') {
				setUser(undefined);
				setIsAuthenticated(false);
			}
		});
		return () => {
			data.subscription.unsubscribe();
		};
	}, []);

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
