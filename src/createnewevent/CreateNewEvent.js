import React, { useEffect, useState } from 'react';

// Redirect
import { useNavigate } from 'react-router-dom';

// Axios for API
import axios from 'axios';

// Import Ant Design
import { Button, Form, Input, Space, Layout, Menu, Typography } from 'antd';
import Logo from '../img/Logo';
import Search from '../img/Search';
import TextArea from 'antd/es/input/TextArea';
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

// Function for menu in Ant Design
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

// Items for menu in Ant Design
const items = [
    getItem('My schedule', '/home'),
    getItem('Invitations', '/invitations'),
    getItem('Pending Invitations', '/pending-invitations'),
    getItem('Profile', '/profile'),
    getItem('Sign out', '/')
]

// CreateNewEvent component
const CreateNewEvent = () => {
    const navigate = useNavigate();

    // Get email from localStorage
    const email = localStorage.getItem('calendar-booking-system-email');

    // States
    const [title, setTitle] = useState("");
    const [starttime, setStarttime] = useState("1300");
    const [endtime, setEndtime] = useState("");
    const [guestemails, setGuestemails] = useState("");
    const [description, setDescription] = useState("");

    // Redirect to Home
    const home = () => {
        navigate('/home');
    }

    useEffect(() => {
        if (email === null) {
            navigate('/');
        }
    }, [email, navigate]);

    // Function will active if user press Submit
    const handleSubmit = (event) => {
        axios.post(`http://localhost:9000/event`, {
            hostemail: email,
            title: title,
            starttime: starttime,
            endtime: endtime,
            description: description,
            target: "public",
            guestemails: guestemails
        }).then(res => {
            navigate('/create-new-event/result');
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
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            style={{
                                height: '100%',
                            }}
                            onClick={({ key }) => {
                                if (key === '/') {
                                    localStorage.clear();
                                    navigate(key, { state: { email: '' } });
                                } else {
                                    navigate(key, { state: { email: email } });
                                }
                            }}
                            items={items}
                        />
                    </Sider>

                    <Content
                        style={{
                            padding: '60px 50px 60px 50px',
                            minHeight: "100vh"
                        }}
                    >
                        <Title level={2} style={{ margin: 0 }}>Create New Event</Title>

                        <div style={{
                            minHeight: "100vh",
                            display: "flex", justifyContent: "center", alignItems: "center"
                        }}>
                            <Form
                                autoComplete="off"
                                onFinish={handleSubmit}
                                style={{
                                    minHeight: "80vh", minWidth: "60vw"
                                }}
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Form.Item
                                    label="Title"
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your title!',
                                        }
                                    ]}
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title || ""}
                                >
                                    <Input placeholder="Event title" />
                                </Form.Item>

                                <Form.Item
                                    label="Start time"
                                    name="starttime"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your starttime!',
                                        }
                                    ]}
                                    onChange={(e) => setStarttime(e.target.value)}
                                    value={starttime || ""}
                                >
                                    <Input type="datetime-local" id="starttime" name="starttime"></Input>
                                </Form.Item>

                                <Form.Item
                                    label="End time"
                                    name="endtime"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your endtime!',
                                        }
                                    ]}
                                    onChange={(e) => setEndtime(e.target.value)}
                                    value={endtime || ""}
                                >
                                    <Input type="datetime-local" id="endtime" name="endtime"></Input>
                                </Form.Item>

                                <Form.Item
                                    label="Meeting description"
                                    name="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description || ""}>
                                    <TextArea rows={4} placeholder="Enter your meeting description" />
                                </Form.Item>

                                <Form.Item
                                    label="Inviting critics"
                                    name="guestemails"
                                    onChange={(e) => setGuestemails(e.target.value)}
                                    value={guestemails || ""}
                                >
                                    <Input placeholder="a1@gmail.com a3@gmail.com a4@gmail.com (each email separated by a space)" />
                                </Form.Item>

                                <Form.Item label="     ">
                                    <Space size={18}>
                                        <Button type="primary" htmlType="submit">Save</Button>
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

export default CreateNewEvent;