import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import NotFound from '../assets/NotFound';
import FormButton from '../components/wrapper-components/FormButton';

const Error = () => {
	const error: any = useRouteError();
	if (error?.status === 404) {
		return (
			<div className="error-content">
				<FormButton caption="Back to Home Page">
					<Link to="/" />
				</FormButton>
				<NotFound />
				<h1>Ooops!</h1>
				<h3>
					The page you are looking for has not been found. Please make sure the
					path is correct!
				</h3>
			</div>
		);
	}
	return <div>Error</div>;
};

export default Error;
