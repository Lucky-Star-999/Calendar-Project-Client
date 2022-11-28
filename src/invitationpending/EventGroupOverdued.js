import React from 'react';

// Import other components
import EventUnitOverdued from './EventUnitOverdued.js';

// Import Ant Design
import { Space, Typography } from 'antd';
const { Title } = Typography;


// EventUnit component
const EventGroupOverdued = (props) => {
    return (
        <>
            <Title level={2} style={{color: '#d9d9d9'}}>{props.eventGroup.date}</Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                {
                    Object.keys(props.eventGroup.events).map((keyName, i) => (
                        <EventUnitOverdued key={i} event={props.eventGroup.events[keyName]} />
                    ))
                }
            </Space>
        </>
    );
}

export default EventGroupOverdued;