import React,{useEffect,useState} from 'react';
import axios from 'axios';
import deleteimg from '/delete.png';
import { Button, message, Popconfirm } from 'antd';
import {jwtDecode} from 'jwt-decode';

import server from '../myServer/Server';


const InitialStudentDelete = ({ id, name ,email, classs}) => {
    const [myobject, setMyobject] = useState({});
    const url1 = `${server}/api/student`;
    const url2 = `${server}/api/post/message`;
    const token = sessionStorage.getItem('Token');
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
    const confirm = () => {
        axios.delete(url1, { data: {id} })
            .then(response => console.log("Successfully Deleted", response))
            .catch(error => console.error("Error in deleting ", error))
        message.success('Deleted Successful')
        const messageObject = {
            email: email,
            section: "admin",
            seen:"unseen",
            message: `${myobject.name} deleted Student named ${name} of class ${classs}.`
          };
    
          axios.post(url2, messageObject)
            .then(response => {
             console.log("Message response:", response);
              message.success("Your message updated");
            })
            .catch(error => {
              console.error("Error posting message:", error);
              message.error("Something went wrong");
            });
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    return (<Popconfirm
        title={`Delete the student ${name}`}
        description="Are you sure ?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
    >
        <img src={deleteimg} alt="del" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
    </Popconfirm>
    );
}
export default InitialStudentDelete;