import axios from 'axios';
import server from '../myServer/Server';
import React, { useEffect, useState } from 'react'

import { useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import crossimg from '/cross.png'
import InitialGetBook from './InitialGetBook';
import { message } from 'antd';
export default function Lbook() {
  const navigate = useNavigate();
  const [book, setBook] = useState([]);
  const [userData, setUserData] = useState([]);
  const [object, setObject] = useState([]);
  const { id } = useParams();
  const url1 = `${server}/api/mybook`;
  const url2 = `${server}/api/userrecords`;
  let myobject = [];
  const token = sessionStorage.getItem('Token');
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        myobject = decodedToken.user[0];
        setObject(myobject)
      } catch (error) {
        console.error('Invalid token:', error);
      }
    } else {
      console.log('No token found');
    }
    console.log(myobject)
    getBook();
    checkLength();
  }, [])
  const checkLength = async () => {
    const email = myobject.mail_id;
    console.log(email);
    await axios.get(url2, {
      params: {
        email: email
      }
    })
      .then((response) => {
        setUserData(response.data)
      })

      .catch((error) => console.log(error))
  }

  const getBook = async () => {

    await axios.get(url1, {
      params: {
        id: { id }
      }
    })
      .then((response) => { setBook(response.data[0]) })

      .catch((error) => console.log(error))

  }
  const goBack = () => {
    navigate('/dashboard/2/sbook')
    console.log('clicked  ')
  }
  return (
    <div style={{ width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '0', zIndex: '2', backgroundColor: '#c7c8d1' }}>
      <div style={{ width: '50vw', height: '60vh' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
          <Link to="/dashboard/2/sbook">
            <img src={crossimg} alt="X" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
          </Link>
        </div>
        <h1 style={{ textAlign: 'center' }}>Book Details</h1>
        <h1>
          {book.name}
        </h1>
        <h2>
          {book.id}
        </h2>
        <h3>
          {book.description}
        </h3>
        <h4>
          {book.quantity}
        </h4>

        <InitialGetBook b_id={book.id} b_name={book.name} length={userData.length} />
      </div>
    </div>
  )
}
