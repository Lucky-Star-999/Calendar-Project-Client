import React from 'react';
import { FiClock } from 'react-icons/fi';
import axios from 'axios';
import { Button, Card, Space, Typography } from 'antd';
const { Title } = Typography;

function EventUnit(props) {
    const deleteEvent = (event, eventid, email) => {
        axios.delete(`http://localhost:9000/invitation/${eventid}/${email}`)
            .then(res => {
                window.location.reload(false);
            });
    }

    return (
        <Card bordered={false}>
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Title level={2} style={{ margin: 0 }}>{props.event.title}</Title>
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
            </div>
            <Button danger onClick={(e) => deleteEvent(e, props.event.eventid, props.event.email)}>
                Delete
            </Button>
        </Card>
    );
}

export default EventUnit;