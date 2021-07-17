import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Camtest from './Camtest';
import Mictest from './Mictest';
import Layout from './Layout';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

function App() {
	const [videoInputs, setVideoInputs] = useState([]);
	const [audioInputs, setAudioInputs] = useState([]);

	useEffect(() => {
		const getMediaDevices = async () => {
			try {
				const devices = await navigator.mediaDevices?.enumerateDevices();
				const videoinputs = devices?.filter(
					(device) => device.kind === 'videoinput'
				);
				const audioinputs = devices?.filter(
					(device) => device.kind === 'audioinput'
				);
				setVideoInputs(videoinputs);
				setAudioInputs(audioinputs);
			} catch (error) {
				console.log(error);
			}
		};
		getMediaDevices();

		navigator?.mediaDevices?.addEventListener('devicechange', () => {
			console.log('ADD NEW DEVICE');
			getMediaDevices();
		});
	}, []);

	return (
		<Router>
			<Layout>
				<Switch>
					<Route exact path='/'>
						<Camtest videoInputs={videoInputs} />
					</Route>
					<Route exact path='/mictest'>
						<Mictest audioInputs={audioInputs} />
					</Route>
				</Switch>
			</Layout>
		</Router>
	);
}

export default App;
