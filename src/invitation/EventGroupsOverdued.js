import React from 'react';

// Import other components
import EventGroupOverdued from './EventGroupOverdued';

// Import Ant Design
import { Space } from 'antd';


// EventGroupsOverdued component
const EventGroupsOverdued = (props) => {
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            {
                Object.keys(props.eventGroups).map((keyName, i) => (
                    <EventGroupOverdued key={i} eventGroup={props.eventGroups[keyName]} />
                ))
            }
        </Space>
    );
}

export default EventGroupsOverdued;