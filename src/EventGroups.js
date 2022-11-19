import React from 'react';
import { Space } from 'antd';
import EventGroup from './EventGroup';



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