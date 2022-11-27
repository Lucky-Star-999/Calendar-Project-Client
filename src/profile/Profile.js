import React, { useEffect } from 'react';
import { Button, Form, Input, Space, Modal } from 'antd';

import { Layout, Typography } from 'antd';

import Logo from '../Logo';
import Search from '../Search';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Header, Content } = Layout;
const { Title } = Typography;






const Profile = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");

    const [form] = Form.useForm();

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const showModal2 = () => {
        setOpen2(true);
    };
    const hideModal2 = () => {
        setOpen2(false);
    };

    const home = () => {
        navigate('/home');
    }

    const deleteAccount = () => {
        axios.delete(`http://localhost:9000/user/${localStorage.getItem('calendar-booking-system-email')}`)
            .then(res => {
                navigate('/');
            });
    }

    useEffect(() => {
        if (localStorage.getItem('calendar-booking-system-email') === null) {
            navigate('/');
        } else {
            window.scrollTo(0, 0);

            // Runs only on the first render
            axios.get(`http://localhost:9000/user/${localStorage.getItem('calendar-booking-system-email')}`)
                .then(res => {
                    return res.data[0];
                }).then(data => {
                    form.setFieldsValue({
                        email: data.email,
                        fullname: data.fullname
                    });

                    setEmail(data.email);
                    setFullname(data.fullname);
                });

        }
    }, [form, navigate]);

    const handleSubmit = (event) => {
        //event.preventDefault();

        axios.put(`http://localhost:9000/user`, {
            email: email, password: password, fullname: fullname
        })
            .then(res => {
                console.log(res.data);
                showModal();
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
                        title="Updated successfully!"
                        open={open}
                        onOk={hideModal}
                        okText="Okay!"
                        onCancel={hideModal}
                        cancelText="Cancel"
                    >
                        <p>Your profile has been updated!</p>
                    </Modal>

                    <Modal
                        title="Delete Your Account!"
                        open={open2}
                        onOk={deleteAccount}
                        okText="Delete!"
                        onCancel={hideModal2}
                        cancelText="Cancel"
                    >
                        <p>This action will delete your account permanently!</p>
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
                                form={form}
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
                                    

                                >
                                    <Input placeholder="Email" disabled={true} />
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
                                        <Button type="primary" htmlType="submit">
                                            Save
                                        </Button>

                                        <Button onClick={home}>
                                            Cancel
                                        </Button>

                                        <Button type="primary" danger onClick={showModal2}>
                                            Delete your account!
                                        </Button>
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

export default Profile;