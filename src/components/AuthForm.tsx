import React, { useState } from 'react';
import TextBox from './wrapper-components/TextBox';
import FormButton from './wrapper-components/FormButton';
import UserCredentials from '../models/UserCredentials';
import Form from './wrapper-components/Form';
import FormButtons from './wrapper-components/FormButtons';
import { useGlobalContext } from '../GlobalContextProvider';

// interface AuthFormProps {
// }

const AuthForm: React.FunctionComponent = () => {
	const [credentials, SetCredentials] = useState<UserCredentials>({
		email: '',
		password: '',
	});
	const { onModalClosed, onSignIn, onRegister } = useGlobalContext();

	const handleEmailChange = (e: any) => {
		const cred = { ...credentials };
		SetCredentials({ ...cred, email: e.target.value });
	};

	const handlePasswordChange = (e: any) => {
		const cred = { ...credentials };
		SetCredentials({ ...cred, password: e.target.value });
	};

	const handleSignUp = (e: any) => {
		e.preventDefault();
		onRegister(credentials.email, credentials.password);
		onModalClosed();
	};

	const handleSignIn = (e: any) => {
		e.preventDefault();
		onSignIn(credentials.email, credentials.password);
		onModalClosed();
	};

	return (
		<Form>
			<TextBox
				label="Email"
				onValueChanged={handleEmailChange}
				placeholder="Enter Email..."
				type="email"
			/>
			<TextBox
				label="Password"
				onValueChanged={handlePasswordChange}
				placeholder="Enter Password..."
				type="password"
			/>
			<FormButtons>
				<FormButton
					caption="Sign Up"
					onClick={handleSignUp}
				/>
				<FormButton
					caption="Sign In"
					onClick={handleSignIn}
				/>
			</FormButtons>
		</Form>
	);
};

export default AuthForm;
