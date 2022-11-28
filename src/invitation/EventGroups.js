import React from 'react';

// Import other components
import EventGroup from './EventGroup';

// Import Ant Design
import { Space } from 'antd';


// EventGroups component
const EventGroups = (props) => {
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            {
                Object.keys(props.eventGroups).map((keyName, i) => (
                    <EventGroup key={i} eventGroup={props.eventGroups[keyName]} />
                ))
            }
        </Space>
    );
}

export default EventGroups;