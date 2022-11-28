import React, { useState, useEffect } from 'react';

// Axios for API
import axios from 'axios';

// Redirect
import { useNavigate } from "react-router-dom";

// Import javascript file for handle event render
import { getAllEvents } from './eventsRenderHandle';

// Import other components
import EventGroups from './EventGroups';
import EventGroupsOverdued from './EventGroupsOverdued';

// Import app logo
import Logo from '../img/Logo';

// Import Ant Design
import { Layout, Menu, Empty, Divider, Typography, Input } from 'antd';
const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { Search } = Input;


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

let listOfItems = [];

// Invitation component
function Invitation() {
    const navigate = useNavigate();

    // States
    const [data, setData] = useState("");
    const [keySearch, setKeySearch] = useState("");

    // Get email from localStorage
    const email = localStorage.getItem('calendar-booking-system-email');

    // Function will active if user type in the search bar
    const onSearch = (value) => {
        setKeySearch(value);
    }

    useEffect(() => {
        if (email === null) {
            navigate('/');
        } else {
            axios.get(`http://localhost:9000/event/invitation/email`, { params: { email: email, keySearch: keySearch } })
                .then(res => {
                    setData(res.data);
                });
        }
    }, [email, navigate, keySearch]);

    // Format data before render
    listOfItems = getAllEvents(listOfItems, data, email);       // Get all events
    let listOfItemsNotOverdued = [];                            // Get not overdued events
    let listOfItemsOverdued = [];                               // Get overdued events

    // Assign events to right type: not overdued, overdued events
    for (let i = 0; i < listOfItems.length; i++) {
        if (listOfItems[i].isoverdued === true) {
            listOfItemsOverdued.push(listOfItems[i]);
        } else {
            listOfItemsNotOverdued.push(listOfItems[i]);
        }
    }

    return (
        <Layout>
            <Header style={{ padding: '25px', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Logo />
                <Search placeholder="Search by title ..." onSearch={onSearch} style={{ width: 300 }} />
            </Header>
            <Content>
                <Layout>
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['/invitations']}
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
                        {listOfItemsNotOverdued.length ? <EventGroups eventGroups={listOfItemsNotOverdued} /> : <Empty />}
                        <Divider>
                            <Title level={1}>Overdued</Title>
                        </Divider>
                        {listOfItemsOverdued.length ? <EventGroupsOverdued eventGroups={listOfItemsOverdued} /> : <Empty />}
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
}

export default Invitation;