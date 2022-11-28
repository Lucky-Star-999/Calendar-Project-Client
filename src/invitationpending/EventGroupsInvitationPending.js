import React from 'react';

// Import other components
import EventGroupInvitationPending from './EventGroupInvitationPending';

// Import Ant Design
import { Space } from 'antd';



// EventGroupsInvitationPending component
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