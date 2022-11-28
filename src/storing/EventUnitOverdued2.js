/*import React from 'react';
import { FiClock } from 'react-icons/fi';
import axios from 'axios';
import { Button, Card, Space, Typography } from 'antd';
const { Title } = Typography;

function EventUnitOverdued(props) {
    const deleteEvent = (event, eventid) => {
        axios.delete(`http://localhost:9000/event/${eventid}`)
            .then(res => {
                window.location.reload(false);
            });
    }

    return (
        <Card style={{ color: '#d9d9d9' }} bordered={false}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title level={2} style={{ margin: 0, color: '#d9d9d9' }}>{props.event.title}</Title>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Space>
                        <FiClock size={20} />
                        <p>
                            <span>{props.event.starttime}</span> - <span>{props.event.endtime}</span>
                        </p>
                    </Space>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ margin: 0 }}>{props.event.description}</p>
                <p style={{ display: "flex", alignItems: "center", margin: 0 }}>
                    <p>{props.event.duration}</p>
                </p>
            </div>
            <Button danger onClick={(e) => deleteEvent(e, props.event.eventid)}>
                Delete
            </Button>

        </Card>
    );
}

export default EventUnitOverdued;*/