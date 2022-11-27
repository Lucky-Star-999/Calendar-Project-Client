import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Menu, Empty, Divider, Typography } from 'antd';
import Logo from '../Logo';
import Search from '../Search';

import { useNavigate } from "react-router-dom";

import EventGroups from './EventGroups';
import EventGroupsOverdued from './EventGroupsOverdued';
const { Header, Content, Sider } = Layout;
const { Title } = Typography;







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


function Invitation() {
    ////////////////////////////////////////
    const [data, setData] = useState("");

    const navigate = useNavigate();
    //const email = state.email;

    const email = localStorage.getItem('calendar-booking-system-email');

    function getListofDates(data) {
        let date = [];

        for (let i = 0; i < data.length; i++) {
            date.push(data[i].startdate);
        }


        let arr = [];

        let newDate = [];


        for (let i = 0; i < date.length; i++) {
            arr.push(date[i].slice(6, 10) + date[i].slice(3, 5) + date[i].slice(0, 2));
        }

        arr = arr.sort();

        for (let i = 0; i < date.length; i++) {
            newDate.push(arr[i].slice(6, 8) + '/' + arr[i].slice(4, 6) + '/' + arr[i].slice(0, 4));
        }

        newDate = [...new Set(newDate)];

        return newDate;
    }

    useEffect(() => {
        if (email === null) {
            navigate('/');
        } else {
            // Runs only on the first render
            axios.get(`http://localhost:9000/event/invitation/email/${email}`)
                .then(res => {
                    setData(res.data);
                });
        }

    }, [email, navigate]);
    ////////////////////////////////////////



    //console.log(data);

    const dates = getListofDates(data);

    listOfItems = [];

    for (let i = 0; i < dates.length; i++) {
        listOfItems[i] = {};
        listOfItems[i]["date"] = dates[i];

        listOfItems[i]["events"] = [];

        let count = 0;

        for (let j = 0; j < data.length; j++) {
            if (data[j].startdate === dates[i]) {
                if (data[j].isoverdued === 'true') {
                    //listOfItems[i]["date"] = dates[i] + ' (overdued)';
                    listOfItems[i]["isoverdued"] = true;
                } else {
                    listOfItems[i]["isoverdued"] = false;
                }

                listOfItems[i].events[count] = {};
                listOfItems[i].events[count]["eventid"] = data[j].eventid;
                listOfItems[i].events[count]["email"] = email;
                listOfItems[i].events[count]["title"] = data[j].title;
                listOfItems[i].events[count]["starttime"] = data[j].starttime;
                listOfItems[i].events[count]["endtime"] = data[j].endtime;
                listOfItems[i].events[count]["description"] = data[j].description;
                listOfItems[i].events[count]["duration"] = data[j].duration;
            }
            count++;
        }
    }

    let listOfItemsNotOverdued = [];
    let listOfItemsOverdued = [];

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
                <Search />
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

/*const Homepage = () => (
    
);*/


export default Invitation;