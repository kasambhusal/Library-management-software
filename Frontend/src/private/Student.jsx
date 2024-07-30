import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import badgeimg from '/badge.png'
import server from '../myServer/Server';
import axios from 'axios';
import Cookies from 'js-cookie';

import studentimg from '/student.png'
import { Button, Drawer } from 'antd';

const Student = () => {
  const [object, setObject] = useState([]);
  const [go, setGo] = useState(true);
  const [pc, setPc] = useState(true);
  const [open, setOpen] = useState(false);
  const [badge, setBadge] = useState(false);
  const url = `${server}/api/get/badge`

  let notification = [];

  let myobject = [];
  const getCookies = (name) => {
    return Cookies.get(name)
  }
  useEffect(() => {
    const token = getCookies('Token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        myobject = decodedToken.user[0];
        setObject(myobject)
        if (myobject.section === "student") {
          setGo(true)
        }
        else {
          setGo(false)
        }

      } catch (error) {
        console.error('Invalid token:', error);
      }
    } else {
      console.log('No token found');
    }
    const width = window.innerWidth;
    if (width > 1000) {
      setPc(true)
    }
    else {
      setPc(false)
    }
    getNotification();

  }, [])
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const getNotification = async () => {
    const response = await axios.get(url)
      .catch(error => console.error(error))
    notification = response.data;
    console.log(notification)
    console.log(notification)
    console.log(notification.length)
    if (notification.length > 0) {
      setBadge(true)
    }
  }
  return (
    go ?
      <div style={{ position: 'relative', width: '100%', height: '91vh', display: 'flex', justifyContent: 'center' }}>
        {
          pc ?
            <div style={{
              width: '25%', height: '100%', borderRadius: '10px', padding: '2vh 0 0 0',
              display: 'flex', flexDirection: 'column', backgroundColor: 'white',
            }}>
              <div style={{ width: '100%', height: '15%', display: 'flex', margin: '2vh 0', gap: '20px', alignItems: 'center' }}>
                <img style={{ width: '60px', height: '60px' }} src={studentimg} alt="student image" />
                <div>
                  <h3 style={{ fontFamily: "Open Sans", fontWeight: '500' }}>
                    {object.name}
                  </h3>
                  <h4 style={{ fontFamily: "Open Sans", fontWeight: '400' }}>{object.mail_id}</h4>

                </div>
              </div>

              <NavLink
                className={(e) => { return e.isActive ? "bg" : "" }}
                style={{ textDecoration: 'none', color: 'black', fontSize: '1.4rem', padding: '20px 20px', fontWeight: 'bold' }}
                to="/dashboard/2/sbook"
              >
                Books
              </NavLink>
              <NavLink
                className={(e) => { return e.isActive ? "bg" : "" }}

                style={{ textDecoration: 'none', color: 'black', fontSize: '1.4rem', padding: '20px 20px', fontWeight: 'bold' }}
                to="/dashboard/2/srecords"
              >
                Records
              </NavLink>
              <NavLink
                className={(e) => { return e.isActive ? "bg" : "" }}

                style={{ textDecoration: 'none', color: 'black', fontSize: '1.4rem', padding: '20px 20px', fontWeight: 'bold' }}
                to="/dashboard/2/notification"
                onClick={() => { setBadge(false) }}
              >
                Notifications
                {
                  badge && (
                    <img src={badgeimg} alt="new" style={{
                      width: '15px', height: '15px', borderRadius: '100%', marginBottom: '-10px'
                    }} />
                  )
                }
              </NavLink>
            </div>
            :
            <>

              <ion-icon size="large" name="grid-outline" onClick={showDrawer} style={{ position: 'absolute', top: '2vh', zIndex: '5', left: '2vw', cursor: 'pointer' }}></ion-icon>
              <Drawer title="Access Menu" onClose={onClose} open={open}>
                <div style={{
                  height: '100%', borderRadius: '10px', padding: '2vh 0 0 0',
                  display: 'flex', flexDirection: 'column', backgroundColor: 'white',
                }}>
                  <div style={{ width: '100%', height: '15%', display: 'flex', margin: '2vh 0', gap: '20px', alignItems: 'center' }}>
                    <img style={{ width: '60px', height: '60px' }} src={studentimg} alt="student image" />
                    <div>
                      <h3 style={{ fontFamily: "Open Sans", fontWeight: '500' }}>
                        {object.name}
                      </h3>
                      <h4 style={{ fontFamily: "Open Sans", fontWeight: '400' }}>{object.mail_id}</h4>
                    </div>
                  </div>
                  <NavLink
                    className={(e) => { return e.isActive ? "bg" : "" }}
                    style={{ textDecoration: 'none', color: 'black', fontSize: '1.4rem', padding: '20px 20px', fontWeight: 'bold' }}
                    to="/dashboard/2/sbook"
                    onClick={() => { setOpen(false) }}
                  >
                    Books
                  </NavLink>
                  <NavLink
                    className={(e) => { return e.isActive ? "bg" : "" }}

                    style={{ textDecoration: 'none', color: 'black', fontSize: '1.4rem', padding: '20px 20px', fontWeight: 'bold' }}
                    to="/dashboard/2/srecords"
                    onClick={() => { setOpen(false) }}
                  >
                    Records
                  </NavLink>
                  <NavLink
                    className={(e) => { return e.isActive ? "bg" : "" }}

                    style={{ textDecoration: 'none', color: 'black', fontSize: '1.4rem', padding: '20px 20px', fontWeight: 'bold' }}
                    to="/dashboard/2/notification"
                    onClick={() => { setOpen(false); setBadge(false) }}
                  >
                    Notifications
                    {
                      badge && (
                        <img src={badgeimg} alt="new" style={{
                          width: '15px', height: '15px', borderRadius: '100%', marginBottom: '-10px'
                        }} />
                      )
                    }
                  </NavLink>
                </div>
              </Drawer>
            </>

        }


        <div className={pc ? 'pc' : 'mobile'} style={{
          height: '100%',
          backgroundColor: 'white',
          display: 'flex'
        }}>

          <div style={{ width: '100%', height: '100%', borderRadius: '10px', overflowY: 'auto' }}>
            <Outlet />
          </div>
        </div>
      </div>
      :
      <div style={{ minHeight: '91vh' }}>
        <h1>You must be student</h1>
      </div>
  );
};

export default Student;
