import React from 'react';
import './Navigation.scss';
import NavButtonGroup from './NavButtonGroup';
import TextBox from './wrapper-components/TextBox';
import FormButton from './wrapper-components/FormButton';
import { useNavigate } from 'react-router-dom';
import AuthForm from './forms/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBookOpen,
	faRightFromBracket,
	faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useGlobalContext } from '../context/GlobalContextProvider';

const Navigation: React.FunctionComponent = () => {
	const navigate = useNavigate();
	const { state, onModalOpened, onSignOut } = useGlobalContext();

	const handleSignOutClicked = (e: any) => {
		console.log(e);
		e.preventDefault();
		onSignOut();
		navigate('/');
	};

	const handleSignInClicked = () => {
		onModalOpened('Sign In', <AuthForm />);
	};

	return (
		<div className="navigation">
			<div className="navigation-content">
				<div className="navigation-content-left">
					<h3 className="title">MyDigitalCookBook</h3>
					<FontAwesomeIcon icon={faBookOpen} />
				</div>
				<div className="navigation-content-right">
					<NavButtonGroup
						labels={
							state.isAuthenticated ? ['Home', 'Categories', 'About App'] : []
						}
					/>
					{state.isAuthenticated ? (
						<>
							<FormButton
								caption=""
								onClick={handleSignOutClicked}
							>
								<FontAwesomeIcon icon={faRightFromBracket} />
							</FormButton>
						</>
					) : (
						<FormButton
							caption=""
							onClick={handleSignInClicked}
						>
							<FontAwesomeIcon icon={faRightToBracket} />
						</FormButton>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navigation;
