import React from 'react';
import { FiClock } from 'react-icons/fi';
import { Card, Space, Typography  } from 'antd';
const { Title } = Typography;

const EventUnitOverdued = (props) => {
    return (
        <Card style={{color: '#d9d9d9'}} bordered={false}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title level={2} style={{ margin: 0, color: '#d9d9d9'}}>{props.event.title}</Title>
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

        </Card>
    );
}

export default EventUnitOverdued;