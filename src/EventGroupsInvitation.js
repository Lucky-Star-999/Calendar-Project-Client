import React from 'react';
import { Space } from 'antd';
import EventGroupInvitation from './EventGroupInvitation';



const EventGroupsInvitation = (props) => {
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            {
                Object.keys(props.eventGroups).map((keyName, i) => (
                    <EventGroupInvitation key={i} eventGroup={props.eventGroups[keyName]} />
                ))
            }
        </Space>
    );
}

export default EventGroupsInvitation;