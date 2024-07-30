import React, { useState, useEffect } from 'react';
import axios from 'axios';
import checkimg from '/check.png';
import { message, Popconfirm } from 'antd';
import { jwtDecode } from 'jwt-decode';

import server from '../myServer/Server';

const InitialBookGive = ({ id, s_name, b_name, s_email }) => {
    const posturl = `${server}/api/records/post`;
    const dateurl = `${server}/api/abook/date`;
    const messageurl = `${server}/api/post/message`;
    const [myobject, setMyobject] = useState({});
    const token = sessionStorage.getItem('Token');
    // const messageurl = `${server}/api/post/message`;
    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setMyobject(decodedToken.user[0]);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        } else {
            console.log('No token found');
        }
    }, [token]);
    const confirm = async () => {
        let date = "";
        const status = "success";
        try {
            const response = await axios.get(dateurl);
            date = response.data;
            console.log(response.data);
            const mydata = {
                status: status,
                id: id,
                date: date
            };
            try {
                await axios.post(posturl, mydata)
                message.success(status, { id }, date);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                const messageObject = {
                    email: s_email,
                    section: "admin",
                    seen: "unseen",
                    message: `${myobject.name} gave a book titled '${b_name}' to the student named ${s_name}.`
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
                console.log("Error on status updating", error)
            }
        } catch (error) {
            console.error("Error in updating ", error);
            message.error("Error");
        }
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    return (<Popconfirm
        title={`Did you give the ${b_name} book to ${s_name}?`}
        description="Are you sure ?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
    >
        <img src={checkimg} alt="del" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
    </Popconfirm>
    );
}
export default InitialBookGive;