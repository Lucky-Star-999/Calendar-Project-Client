import React from 'react';

// Redirect
import { useNavigate } from "react-router-dom";

// Import Ant Design
import { Button, Result } from 'antd';


// CreateEventResult component
function CreateEventResult() {
	const navigate = useNavigate();

	// Redirect to Create new event
	const nextEvent = () => {
		navigate('/create-new-event');
	}

	// Redirect to Home
	const home = () => {
		navigate('/home');
	}

	return (
		<Result
			status="success"
			title="Successfully Create New Event!"
			subTitle=""
			extra={[
				<Button type="primary" key="console" onClick={nextEvent}>Create Next Event</Button>,
				<Button key="buy" onClick={home}>My Schedule</Button>,
			]}
		/>
	);
}

export default CreateEventResult;