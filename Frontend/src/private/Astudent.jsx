import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import server from '../myServer/Server';
import { message } from 'antd';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function Astudent() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [messages, setMessages] = useState('Please Enter Correct Details');
  const url = `${server}/api/student`;
  const messageurl = `${server}/api/post/message`;
  let myobject = [];
  const token = sessionStorage.getItem('Token');
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        myobject = decodedToken.user[0];
        setEmail(myobject.mail_id)
        setName(myobject.name)
      } catch (error) {
        console.error('Invalid token:', error);
      }
    } else {
      console.log('No token found');
    }
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    axios.post(url, formObject)
      .then(response => {
        console.log(response.data);
        setMessages('Student Added!');
        if(response){
          const messageObject = {
            email: email,
            section: "admin",
            seen:"unseen",
            message: `${name} added ${formObject.name} as a Student in class ${formObject.myclass}.`
          }
          axios.post(messageurl, messageObject)
            .then(response => {
              console.log(response);
              message.success("Your message updated");
            })
            .catch(error => {
              console.error(error);
              message.error("Something went wrong");
            });
        }
      })
      .catch(error => {
        console.error('Error adding student:', error);
        setMessages('Sorry, an error occurred.');
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ width: '100vw', minHeight: '88vh', backgroundColor: '#cfcbc2', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '50vw', height: 'auto', border: '7px groove #5c5648', borderRadius: '10px', boxShadow: '3px 3px #87847b', padding: '0 2vw 2vw 2vw', margin: '3vh 0 ' }}>
            <div style={{ display: 'flex', justifyContent: 'right', marginRight: '-2vw' }}>
              <div style={{ width: '30px', height: '30px', backgroundColor: '#e80523', color: 'white', fontWeight: 'bold', fontSize: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                <Link to="/dashboard/1/addstudents" style={{ textDecoration: 'none', color: 'white' }}>X</Link>
              </div>
            </div>
            <h1 style={{ textAlign: 'center' }}>Add Students</h1>
            <div style={{ display: 'flex', margin: '3vh 1vw', height: '80%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '35%', height: '100%', gap: '20px' }}>
                <label style={{ fontSize: '25px', fontWeight: 'bold' }}>Name :-</label>
                <label style={{ fontSize: '25px', fontWeight: 'bold' }}>Email :-</label>
                <label style={{ fontSize: '25px', fontWeight: 'bold' }}>Class :-</label>
                <label style={{ fontSize: '25px', fontWeight: 'bold' }}>Password :-</label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '65%', height: '100%', gap: '20px' }}>
                <input name='name' type="text" placeholder='Enter Name of the admin' style={{ padding: '6px 10px', border: '1px solid black', borderRadius: '5px' }} required />
                <input name='email' type="email" placeholder='Enter the Email Id' style={{ padding: '6px 10px', border: '1px solid black', borderRadius: '5px' }} required />
                <select name="myclass">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <input name='password' type="text" style={{ padding: '6px 10px', border: '1px solid black', borderRadius: '5px' }} required />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'red' }}>{messages}</div>
              <button type='submit' style={{ cursor: 'pointer', padding: '4px 6px', border: '1px solid white', borderRadius: '6px', backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}>Save Student</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
