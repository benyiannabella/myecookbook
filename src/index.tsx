import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GlobalContextProvider from './context/GlobalContextProvider';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<GlobalContextProvider>
			<App />
		</GlobalContextProvider>
	</React.StrictMode>
);
