import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllEvents } from './eventsRenderHandle';
import { Layout, Menu, Empty, Divider, Typography, Button, Input } from 'antd';
import Logo from '../img/Logo';
//import Search from '../img/Search';
import { useNavigate } from "react-router-dom";
import EventGroups from './EventGroups';
import EventGroupsOverdued from './EventGroupsOverdued';
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const { Search } = Input;









function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('My schedule', '/home'),
    getItem('Invitations', '/invitations'),
    getItem('Pending Invitations', '/pending-invitations'),
    getItem('Profile', '/profile'),
    getItem('Sign out', '/')
]

let listOfItems = [
    {
        date: "19/11/2022",
        events: [
            { title: "Ford", starttime: "Mustang", endtime: "Mustang", description: "des", duration: "10p" },
            { title: "Ford2", starttime: "Mustang2", endtime: "Mustang2", description: "des2", duration: "10p" },
            { title: "Ford3", starttime: "Mustang2", endtime: "Mustang2", description: "des2", duration: "10p" }
        ]
    },
    {
        date: "20/11/2022",
        events: [
            { title: "Ford", starttime: "Mustang", endtime: "Mustang", description: "des", duration: "10p" },
            { title: "Ford2", starttime: "Mustang2", endtime: "Mustang2", description: "des2", duration: "10p" }
        ]
    }
]

listOfItems = [];




function Homepage() {
    ////////////////////////////////////////
    const navigate = useNavigate();

    const [data, setData] = useState("");
    const [keySearch, setKeySearch] = useState("");

    const email = localStorage.getItem('calendar-booking-system-email');

    const createNewEvent = () => {
        navigate('/create-new-event');
    }

    const onSearch = (value) => {
        setKeySearch(value);
    }

    useEffect(() => {
        if (email === null) {
            navigate('/');
        } else {
            // Runs only on the first render
            axios.get(`http://localhost:9000/event/email`, { params: { email: email, keySearch: keySearch } })
                .then(res => {
                    setData(res.data);
                });
        }
    }, [email, keySearch, navigate]);


    listOfItems = getAllEvents(listOfItems, data);      // Get all events
    let listOfItemsNotOverdued = [];                    // Get not overdued events
    let listOfItemsOverdued = [];                       // Get overdued events

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
                            defaultSelectedKeys={['/home']}
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
                        <div style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                            <Button type="primary" size="large" onClick={createNewEvent}>
                                Create New Event
                            </Button>
                        </div>

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

export default Homepage;