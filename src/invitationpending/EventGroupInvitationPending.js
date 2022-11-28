import React from 'react';

// Import other components
import EventUnitInvitationPending from './EventUnitInvitationPending';

// Import Ant Design
import { Space, Typography } from 'antd';
const { Title } = Typography;


// EventGroupInvitationPending component
const EventGroupInvitationPending = (props) => {
    return (
        <>
            <Title level={2}>{props.eventGroup.date}</Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                {
                    Object.keys(props.eventGroup.events).map((keyName, i) => (
                        <EventUnitInvitationPending key={i} event={props.eventGroup.events[keyName]} />
                    ))
                }
            </Space>
        </>
    );
}

export default EventGroupInvitationPending;