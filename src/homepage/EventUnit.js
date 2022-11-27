import React from 'react';
import { FiClock } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Card, Space, Typography } from 'antd';
const { Title } = Typography;

function EventUnit(props) {

    const navigate = useNavigate();

    const handleSubmit = (event, eventid) => {
        localStorage.setItem('calendar-booking-system-eventid', eventid);
        navigate("/edit-event");
    }

    const deleteEvent = (event, eventid) => {
        axios.delete(`http://localhost:9000/event/${eventid}`)
            .then(res => {
                window.location.reload(false);
            });
    }

    return (
        <Card bordered={false}>
            <div onClick={(e) => handleSubmit(e, props.event.eventid)} style={{ cursor: 'pointer' }} id="event1">
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
            <Button danger onClick={(e) => deleteEvent(e, props.event.eventid)}>
                Delete
            </Button>
        </Card>
    );
}

export default EventUnit;