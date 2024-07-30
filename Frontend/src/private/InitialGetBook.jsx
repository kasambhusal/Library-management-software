import React, { useState, useEffect } from 'react';
import server from '../myServer/Server';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { message, Popconfirm } from 'antd';

const InitialGetBook = ({ b_id, b_name, length }) => {
    const [student, setStudent] = useState({});
    const [s_name, setS_name] = useState('');
    const [email, setEmail] = useState('');
    const [clas, setClas] = useState('');
    const url = `${server}/api/post/records`;
    const messageurl = `${server}/api/post/message`;
    useEffect(() => {
        const token = sessionStorage.getItem('Token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const myobject = decodedToken.user[0];
                setStudent(myobject);
                setS_name(myobject.name || '');
                setEmail(myobject.mail_id || '');
                setClas(myobject.class || '');
            } catch (error) {
                console.error('Invalid token:', error);
            }
        } else {
            console.log('No token found');
        }
    }, []);

    const postRecord = async () => {
        const objectToPost = {
            s_name: s_name,
            email: email,
            class_name: clas,
            b_name: b_name,
            b_id: b_id
        };

        console.log("Object to post:", objectToPost);

        await axios.post(url, objectToPost)
            .then(response => {
                console.log(response);
                message.success("Your Book is Requested");
            })
            .catch(error => {
                console.error(error);
                message.error("Something went wrong");
            });
    };
    const postMessage = async () => {
        const messageObject = {
            email: email,
            section: "student",
            seen: "unseen",
            message: `${s_name} requested for ${b_name} book.`
        }
        await axios.post(messageurl, messageObject)
            .then(response => {
                console.log(response);
                message.success("Your message updated");
            })
            .catch(error => {
                console.error(error);
                message.error("message not send");
            });
    }
    const confirm = () => {
        if (length < 2) {
            postRecord();
            postMessage();
        }
        else {
            message.error("Sorry you can't request more than 2 books !!!")
        }
    };

    const cancel = () => {
        message.error('Click on No');
    };

    return (
        <Popconfirm
            title={`Did you really want to get ${b_name}?`}
            description="Are you sure?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <button style={{ padding: '7px 6px', border: 'none', cursor: 'pointer', backgroundColor: 'blue', color: 'white', fontWeight: 'bold', borderRadius: '10px' }}>
                Get Book
            </button>
        </Popconfirm>
    );
};

export default InitialGetBook;
