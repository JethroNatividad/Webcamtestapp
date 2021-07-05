import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Camtest from './Camtest';
import Mictest from './Mictest';

import './App.css';

function App() {
	const [videoInputs, setVideoInputs] = useState([]);
	const [audioInputs, setAudioInputs] = useState([]);

	useEffect(() => {
		const getMediaDevices = async () => {
			const devices = await navigator.mediaDevices.enumerateDevices();
			const videoinputs = devices.filter(
				(device) => device.kind === 'videoinput'
			);
			const audioinputs = devices.filter(
				(device) => device.kind === 'audioinput'
			);

			setVideoInputs(videoinputs);
			setAudioInputs(audioinputs);
		};
		getMediaDevices();

		const unlisten = (navigator.mediaDevices.ondevicechange = () => {
			console.log('ADD NEW DEVICE');
			getMediaDevices();
		});

		return () => {
			unlisten();
		};
	}, []);

	return (
		<Switch>
			<Route exact path='/'>
				<Camtest videoInputs={videoInputs} />
			</Route>
			<Route exact path='/mictest'>
				<Mictest audioInputs={audioInputs} />
			</Route>
		</Switch>
	);
}

export default App;
