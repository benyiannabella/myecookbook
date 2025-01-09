import React, { useState } from 'react';
import TextBox from '../wrapper-components/TextBox';
import FormButton from '../wrapper-components/FormButton';
import UserCredentials from '../../models/UserCredentials';
import Form from '../wrapper-components/Form';
import FormButtons from '../wrapper-components/FormButtons';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import { validateFormData } from '../../services/ValidationService';
import { loginFormValidation } from '../../services/ValidationHelper';
import Tooltip from '../wrapper-components/Tooltip';

// interface AuthFormProps {
// }

const AuthForm: React.FunctionComponent = () => {
	const [credentials, SetCredentials] = useState<UserCredentials>({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const { onModalClosed, onSignIn, onRegister } = useGlobalContext();

	const handleEmailChange = (e: any) => {
		const cred = { ...credentials };
		SetCredentials({ ...cred, email: e.target.value });
	};

	const handlePasswordChange = (e: any) => {
		const cred = { ...credentials };
		SetCredentials({ ...cred, password: e.target.value });
	};

	const handleRegister = (e: any) => {
		e.preventDefault();
		const validationResult = validateFormData(
			{ email: credentials.email, password: credentials.password },
			loginFormValidation
		);
		if (validationResult.isValid) {
			onRegister(credentials.email, credentials.password);
			setErrors({});
			onModalClosed();
		} else {
			setErrors(validationResult.errors);
		}
	};

	const handleSignIn = (e: any) => {
		e.preventDefault();
		const validationResult = validateFormData(
			{ email: credentials.email, password: credentials.password },
			loginFormValidation
		);
		if (validationResult.isValid) {
			onSignIn(credentials.email, credentials.password);
			setErrors({});
			onModalClosed();
		} else {
			setErrors(validationResult.errors);
		}
	};

	return (
		<Form>
			<TextBox
				label="Email"
				onValueChanged={handleEmailChange}
				placeholder="Enter Email..."
				type="email"
				error={errors.email}
				name="email"
			/>
			<TextBox
				label="Password"
				onValueChanged={handlePasswordChange}
				placeholder="Enter Password..."
				type="password"
				error={errors.password}
			/>
			<FormButtons>
				<FormButton
					caption="Register"
					onClick={handleRegister}
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
