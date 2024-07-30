import React, { useState, useEffect } from 'react';
import axios from 'axios';
import returnimg from '/return.png';
import { message, Popconfirm } from 'antd';
import { jwtDecode } from 'jwt-decode';

import server from '../myServer/Server';

const InitialBookTake = ({ id, s_name, b_name, s_email }) => {
    const [g_date, setG_date] = useState('');
    const dateurl = `${server}/api/abook/date`;
    const posturl = `${server}/api/gotdate`;
    const messageurl = `${server}/api/post/message`;

    const confirm = async () => {
        const dateResponse = await axios.get(dateurl);
        setG_date(dateResponse.data)
        console.log(dateResponse.data)
        console.log(dateResponse.data)
        // console.log(g_date)
        // .catch(error => console.error(error))
        try {
            const mydata = {
                id: id,
                date: dateResponse.data,
                status: "completed"
            };
            try {
                await axios.post(posturl, mydata);
                message.success("Successfully updated");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                const messageObject = {
                    email: s_email,
                    section: "admin",
                    seen: "unseen",
                    message: `Student named '${s_name}' returned the  book titled '${b_name}'.`
                };
                try {
                    axios.post(messageurl, messageObject)
                        .then(response => {
                            console.log("Message response:", response);
                            message.success("Your message updated");
                        })
                }
                catch (error) {
                    console.log("Error on message updating", error)
                }
            }
            catch (error) {
                console.log(error)
                message.error("Error on returning");
            }

        } catch (error) {
            console.error("Error in updating", error);
            message.error("Error on date detecting");
        }

    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    return (<Popconfirm
        title={`Did ${s_name} return the ${b_name} book ?`}
        description="Are you sure ?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
    >
        <img src={returnimg} alt="del" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
    </Popconfirm>
    );
}
export default InitialBookTake;