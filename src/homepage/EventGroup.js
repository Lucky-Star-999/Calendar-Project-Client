import React from 'react';
import { Space, Typography } from 'antd';
import EventUnit from './EventUnit';
const { Title } = Typography;


const EventGroup = (props) => {
    return (
        <>
            <Title level={2}>{props.eventGroup.date}</Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                {
                    Object.keys(props.eventGroup.events).map((keyName, i) => (
                        <EventUnit key={i} event={props.eventGroup.events[keyName]} />
                    ))
                }
            </Space>
        </>
    );
}

export default EventGroup;