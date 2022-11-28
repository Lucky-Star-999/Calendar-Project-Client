import React from 'react';

// Redirect
import { useNavigate } from "react-router-dom";

// Import Ant Design
import { Button, Result } from 'antd';


// CreateUserResult component
function CreateUserResult() {
	const navigate = useNavigate();

	// Redirect to Login
	const home = () => {
		navigate('/');
	}

	return (
		<Result
			status="success"
			title="Successfully Create New Account!"
			subTitle="Now you can login your account and enjoy our product!"
			extra={[
				<Button type="primary" key="console" onClick={home}>
					Okay!
				</Button>
			]}
		/>
	);
}

export default CreateUserResult;