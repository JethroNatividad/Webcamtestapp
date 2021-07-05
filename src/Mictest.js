import { Button, notification, Select, Typography } from 'antd';
import React, { useEffect, useState, useRef } from 'react';

const { Option } = Select;
const Mictest = ({ audioInputs }) => {
	const [currentDevice, setCurrentDevice] = useState('');
	const audioElementRef = useRef();

	useEffect(() => {
		setCurrentDevice(audioInputs[0]?.deviceId);
	}, [audioInputs]);

	const openMic = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: { deviceId: currentDevice },
				video: false,
			});
			audioElementRef.current.srcObject = stream;
			audioElementRef.current.play();
			// setWebcamOpen(true);
			notification.success({ message: 'Audio started' });
		} catch (err) {
			notification.error({ message: err.message });
		}
	};

	return (
		<div>
			<h1 className='display-4'>Test your Mic</h1>
			<div className='mb-1'>
				<Typography.Text strong style={{ marginRight: '10px' }}>
					Select Input Device:
				</Typography.Text>
				<Select
					value={currentDevice}
					style={{ width: '200px' }}
					onChange={(e) => setCurrentDevice(e)}
					loading={currentDevice === ''}
					// disabled={webcamOpen}
				>
					{audioInputs.map((device) => (
						<>
							<Option value={device.deviceId.toString()}>
								{device.label.toString()}
							</Option>
						</>
					))}
				</Select>
				<audio ref={audioElementRef} controls />\
				<div>
					<Button
						style={{ marginRight: 5 }}
						onClick={openMic}
						type='primary'
						// disabled={webcamOpen}
					>
						Open mic
					</Button>
					{/* <Button onClick={stopWebcam} disabled={!webcamOpen} type='danger'>
						Stop webcam
					</Button> */}
				</div>
			</div>
		</div>
	);
};

export default Mictest;
