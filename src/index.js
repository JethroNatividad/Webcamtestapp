import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Layout from './Layout';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
	<Router>
		<Layout>
			<App />
		</Layout>
	</Router>,
	document.getElementById('root')
);
