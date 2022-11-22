import React from 'react';
import { Space, Typography } from 'antd';
import EventUnitInvitationPending from './EventUnitInvitationPending';
const { Title } = Typography;


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