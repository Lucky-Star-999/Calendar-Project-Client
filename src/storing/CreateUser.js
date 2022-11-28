import React from 'react';
import { Button, Form, Input, Space } from 'antd';

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CreateUser = () => {

    //const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");

    const handleSubmit = (event) => {
        //event.preventDefault();

        axios.post(`http://localhost:9000/user`, { email, password, fullname })
            .then(res => {
                console.log(res.data);
                /*if (res.data === 'Login successfully') {
                  navigate("/home", { state: { email: email } });
                }*/
            });
    }

    return (
        <Form autoComplete="off" onFinish={handleSubmit}>
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

            <Form.Item
                label="Full name"
                name="fullname"
                rules={[
                    {
                        required: true,
                        message: 'Please input your full name!',
                    }
                ]}
                onChange={(e) => setFullname(e.target.value)} value={fullname}
            >
                <Input />
            </Form.Item>

            <Form.Item>
                <Space size={18}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

                    <Button>
                        Cancel
                    </Button>
                </Space>
            </Form.Item>


        </Form>
    );
};

export default CreateUser;