import React from 'react';
import { Space } from 'antd';
import EventGroupInvitationPending from './EventGroupInvitationPending';



const EventGroupsInvitationPending = (props) => {
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            {
                Object.keys(props.eventGroups).map((keyName, i) => (
                    <EventGroupInvitationPending key={i} eventGroup={props.eventGroups[keyName]} />
                ))
            }
        </Space>
    );
}

export default EventGroupsInvitationPending;