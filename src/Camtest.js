import { Button, notification, Select, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const { Option } = Select;
const Camtest = ({ videoInputs }) => {
	const [currentDevice, setCurrentDevice] = useState('');
	const [webcamOpen, setWebcamOpen] = useState(false);
	const videoElementRef = useRef();

	useEffect(() => {
		setCurrentDevice(videoInputs[0]?.deviceId);
	}, [videoInputs]);

	const openWebcam = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {
					deviceId: currentDevice,
					width: { min: 1024, ideal: 1280, max: 1920 },
					height: { min: 576, ideal: 720, max: 1080 },
				},
			});
			videoElementRef.current.srcObject = stream;
			videoElementRef.current.play();
			setWebcamOpen(true);
			notification.success({ message: 'Webcam started' });
		} catch (err) {
			notification.error({ message: err.message });
		}
	};
	const stopWebcam = async () => {
		try {
			videoElementRef.current.srcObject.getTracks().forEach((track) => {
				track.stop();
			});
			setWebcamOpen(false);

			notification.success({ message: 'Webcam stopped' });
		} catch (err) {
			notification.error({ message: err.message });
		}
	};

	return (
		<div className='mt-2'>
			<div className='mb-1'>
				<Typography.Text strong style={{ marginRight: '10px' }}>
					Select Input Device:
				</Typography.Text>
				<Select
					value={currentDevice}
					style={{ width: '200px' }}
					onChange={(e) => setCurrentDevice(e)}
					loading={currentDevice === ''}
					disabled={webcamOpen}
				>
					{videoInputs.map((device) => (
						<>
							<Option value={device.deviceId.toString()}>
								{device.label.toString()}
							</Option>
						</>
					))}
				</Select>
			</div>

			<div className='row d-flex justify-content-center'>
				<div
					style={{
						height: 'auto',
						background: '#e9e9e9',
					}}
					className='col-11 col-lg-9 col-xl-7 p-0 '
				>
					<video className='w-100' ref={videoElementRef} muted />
				</div>
			</div>

			<div
				style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
			>
				<div>
					<Button
						style={{ marginRight: 5 }}
						onClick={openWebcam}
						type='primary'
						disabled={webcamOpen}
					>
						Open webcam
					</Button>
					<Button onClick={stopWebcam} disabled={!webcamOpen} type='danger'>
						Stop webcam
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Camtest;
