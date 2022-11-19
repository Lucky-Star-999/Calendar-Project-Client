import React from 'react';
import { Layout, Menu, Empty } from 'antd';
import Logo from './Logo';
import Search from './Search';

import EventGroups from './EventGroups';
const { Header, Content, Sider } = Layout;



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
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3')
]

const listOfItems = [
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



const Homepage = () => (
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
                        defaultSelectedKeys={['1']}
                        style={{
                            height: '100%',
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
                    { listOfItems.length ? <EventGroups eventGroups={listOfItems} /> : <Empty /> }
                </Content>
            </Layout>
        </Content>
    </Layout>
);


export default Homepage;