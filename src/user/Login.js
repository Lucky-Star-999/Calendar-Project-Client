import React, { useState } from 'react';

// Axios for API
import axios from 'axios';

// Redirect
import { useNavigate } from "react-router-dom";

// Import Login background
import background from "./bg.svg";

// Import Login logo
import LoginLogo from "./LoginLogo.js";

// Import Ant Design
import { Button, Form, Input, Space, Modal } from 'antd';


// Login component
const Login = () => {
	const navigate = useNavigate();

	// States
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Redirect to Create new Account
	const createUser = () => {
		navigate('/create-user');
	}

	// Remove all things in localStorage
	localStorage.clear();

	// States of Modals
	const [open, setOpen] = useState(false);
	const [open1, setOpen1] = useState(false);

	// Functions to interact with Modals
	const showModal = () => {
		setOpen(true);
	};
	const hideModal = () => {
		setOpen(false);
	};
	const showModal1 = () => {
		setOpen1(true);
	};
	const hideModal1 = () => {
		setOpen1(false);
	};

	// Function will active if user press Submit
	const handleSubmit = (event) => {

		axios.post(`http://localhost:9000/user/login`, { email, password })
			.then(res => {
				localStorage.setItem('calendar-booking-system-email', email);

				if (res.data === 'Login successfully') {
					navigate("/home", { state: { email: email } });
				} else if (res.data === 'Wrong password') {
					showModal();
				} else if (res.data === 'Username does not exist') {
					showModal1();
				}
			});
	}

	return (

		<div style={{
			backgroundImage: `url("${background}")`, minHeight: "100vh",
			display: "flex", justifyContent: "center", alignItems: "center"
		}}>

			<Modal
				title="Wrong password!"
				open={open}
				onOk={hideModal}
				okText="Okay!"
				onCancel={hideModal}
				cancelText="Cancel"
			>
				<p>Your password is wrong! Please type carefully!</p>
			</Modal>

			<Modal
				title="Email does not exist!"
				open={open1}
				onOk={hideModal1}
				okText="Okay!"
				onCancel={hideModal1}
				cancelText="Cancel"
			>
				<p>The email does not exist! Please type carefully or create new account!</p>
			</Modal>

			<Form autoComplete="off" onFinish={handleSubmit}
				style={{ minHeight: "40vh", minWidth: "30vw" }}>

				<Form.Item style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
					<LoginLogo />
				</Form.Item>

				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: 'Please input your email!',
						}
					]}
					onChange={(e) => setEmail(e.target.value)} value={email}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
					onChange={(e) => setPassword(e.target.value)} value={password}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item>
					<Space size={60} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
						<Button onClick={createUser}>
							Create an account
						</Button>
					</Space>

				</Form.Item>
			</Form>
		</div>

	);
};

export default Login;