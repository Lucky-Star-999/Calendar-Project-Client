import React, { useEffect } from 'react';
import { Button, Form, Input, Space } from 'antd';

import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';


const EditEvent = () => {

    //const navigate = useNavigate();
    const eventid = 'event1';
    const [title, setTitle] = useState("");
    const [starttime, setStarttime] = useState("");
    const [endtime, setEndtime] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        // Runs only on the first render
        axios.get(`http://localhost:9000/event/eventid/${eventid}`)
            .then(res => {
                setTitle(res.data[0].title);
                setStarttime(res.data[0].starttime);
                setEndtime(res.data[0].endtime);
                setDescription(res.data[0].description);
                console.log(title);
                console.log(starttime);
                console.log(endtime);
                console.log(description);
            });
    }, [title, starttime, endtime, description]);

    const handleSubmit = (event) => {
        //event.preventDefault();

        /*axios.post(`http://localhost:9000/user`, { email, password, fullname })
            .then(res => {
                console.log(res.data);
            });*/
            console.log(starttime);
    }


    return (
        <Form autoComplete="off" onFinish={handleSubmit}  initialValues={{
            "title": 123
          }}>

            <Form.Item
                label="Title"
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Please input your title!',
                    }
                ]}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            >
                <Input placeholder="Event title" />
            </Form.Item>

            <Form.Item label="Start time" name="starttime" rules={[
                {
                    required: true,
                    message: 'Please input your starttime!',
                }

            ]}
                onChange={(e) => setTitle(e.target.starttime)}
                value={starttime}
            >
                <input style={{ padding: '7px', borderWidth: '1px', borderRadius: '5px', outline: 'none', borderColor: '#D9D9D9' }}
                    type="datetime-local" id="starttime" name="starttime"></input>
            </Form.Item>

            <Form.Item label="End time" name="endtime" rules={[
                {
                    required: true,
                    message: 'Please input your endtime!',
                }
            ]}
                onChange={(e) => setTitle(e.target.endtime)}
                value={endtime}
            >
                <input style={{ padding: '7px', borderWidth: '1px', borderRadius: '5px', outline: 'none', borderColor: '#D9D9D9' }}
                    type="datetime-local" id="endtime" name="endtime"></input>
            </Form.Item>

            <Form.Item label="Meeting description" name="description" onChange={(e) => setTitle(e.target.description)} value={description}>
                <TextArea rows={4} placeholder="Enter your meeting description" />
            </Form.Item>

            <Form.Item label="Inviting critics">
                <Input placeholder="admin2@gmail.com admin3@gmail.com admin4@gmail.com" />
            </Form.Item>

            <Form.Item>
                <Space size={18}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>

                    <Button>
                        Cancel
                    </Button>
                </Space>
            </Form.Item>


        </Form>
    );
};

export default EditEvent;