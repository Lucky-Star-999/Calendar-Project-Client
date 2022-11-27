import React from 'react';
import { Button, Form, Input, Space } from 'antd';

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import background from "./bg.svg";
import LoginLogo from "./LoginLogo.js";

const Login = () => {
  

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = () => {
    navigate('/create-user');
  }

  localStorage.clear();

  const handleSubmit = (event) => {

    axios.post(`http://localhost:9000/user/login`, { email, password })
      .then(res => {
        console.log(res.data);
        localStorage.setItem('calendar-booking-system-email', email);

        if (res.data === 'Login successfully') {
          navigate("/home", { state: { email: email } });
        }
      });
  }

  return (

    <div style={{
      backgroundImage: `url("${background}")`, minHeight: "100vh",
      display: "flex", justifyContent: "center", alignItems: "center"
    }}>

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