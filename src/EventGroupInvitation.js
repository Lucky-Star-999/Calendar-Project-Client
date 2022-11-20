import React from 'react';
import { Space, Typography } from 'antd';
import EventUnitInvitation from './EventUnitInvitation';
const { Title } = Typography;


const EventGroupInvitation = (props) => {
    return (
        <>
            <Title level={2}>{props.eventGroup.date}</Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                {
                    Object.keys(props.eventGroup.events).map((keyName, i) => (
                        <EventUnitInvitation key={i} event={props.eventGroup.events[keyName]} />
                    ))
                }
            </Space>
        </>
    );
}

export default EventGroupInvitation;