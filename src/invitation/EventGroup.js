import React from 'react';

// Import other components
import EventUnit from './EventUnit';

// Import Ant Design
import { Space, Typography } from 'antd';
const { Title } = Typography;


// EventGroup component
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