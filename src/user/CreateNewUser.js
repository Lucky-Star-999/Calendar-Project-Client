import React, { useState } from 'react';

// Axios for API
import axios from 'axios';

// Redirect
import { useNavigate } from 'react-router-dom';

// Import app logo
import Logo from '../img/Logo';

// Import search icon
import Search from '../img/Search';

// Import Ant Design
import { Button, Form, Input, Space, Modal, Layout, Typography } from 'antd';
const { Header, Content } = Layout;
const { Title } = Typography;


// CreateNewUser component
const CreateNewUser = () => {
    const navigate = useNavigate();

    // States
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");

    // State of modals
    const [open, setOpen] = useState(false);

    // Functions to interact with Modals
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };

    // Redirect to Login
    const home = () => {
        navigate('/');
    }

    // Function will active if user press Submit
    const handleSubmit = (event) => {
        axios.post(`http://localhost:9000/user`, {
            email: email,
            password: password,
            fullname: fullname
        }).then(res => {
            if (res.data === 'Register successfully') {
                navigate('/create-user/result');
            } else if (res.data === 'The email is existed') {
                showModal();
            }
        });
    }

    return (
        <Layout>
            <Header style={{ padding: '25px', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Logo />
                <Search />
            </Header>
            <Content>
                <Layout>
                    <Modal
                        title="Duplicated Email"
                        open={open}
                        onOk={hideModal}
                        okText="Ok, I will change the email!"
                        onCancel={hideModal}
                        cancelText="Cancel"
                    >
                        <p>The email is existed! You need to change your email!</p>
                    </Modal>

                    <Content
                        style={{
                            padding: '60px 50px 60px 50px',
                            minHeight: "100vh"
                        }}
                    >
                        <Title level={2} style={{ margin: 0 }}>Create New Account</Title>

                        <div style={{
                            minHeight: "100vh",
                            display: "flex", justifyContent: "center", alignItems: "center"
                        }}>
                            <Form autoComplete="off" onFinish={handleSubmit} style={{
                                minHeight: "80vh", minWidth: "60vw"
                            }}
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 14 }}
                            >

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Email is not a valid email!',
                                            type: 'email'
                                        }
                                    ]}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email || ""}
                                    hasFeedback
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>

                                <Form.Item
                                    label="Fullname"
                                    name="fullname"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your full name!'
                                        }
                                    ]}
                                    onChange={(e) => setFullname(e.target.value)}
                                    value={fullname || ""}
                                >
                                    <Input placeholder="Full name" />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your title!',
                                        }
                                    ]}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password || ""}
                                    hasFeedback
                                >
                                    <Input.Password placeholder="Password" />
                                </Form.Item>


                                <Form.Item
                                    name="confirm"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder="Confirm Password" />
                                </Form.Item>

                                <Form.Item label="     ">
                                    <Space size={18}>
                                        <Button type="primary" htmlType="submit">Create</Button>
                                        <Button onClick={home}>Cancel</Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </div>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
};

export default CreateNewUser;