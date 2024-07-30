import axios from 'axios';
import React, { useEffect, useState } from 'react';
import server from '../myServer/Server';
import { jwtDecode } from 'jwt-decode';

export default function Notification() {
    const [email, setEmail] = useState('');
    const [nomessage, setnomessage] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [days, setDays] = useState(1000);
    const url1 = `${server}/api/get/message`;
    const url2 = `${server}/api/get/badge`;
    const token = sessionStorage.getItem('Token');
    let myemail = '';
    useEffect(() => {
        axios.post(url2, {
            params: {
                seen: "seen"
            }
        })
            .then(response => console.log(response))
            .catch(error => console.error(error))
    }, []);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const user = decodedToken.user[0];
                if (user.section === "admin") {
                    setEmail('');
                    myemail = '';
                } else {
                    setEmail(user.mail_id);
                    myemail = user.mail_id;
                }
            } catch (error) {
                console.error('Invalid token:', error);
            }
        } else {
            console.log('No token found');
        }
        getMessage();
    }, [days]); // Re-fetch messages when the days state changes

    const getMessage = async () => {
        try {
            const response = await axios.get(url1, {
                params: {
                    section: email ? 'user' : 'admin',
                    email: myemail,
                    days: days
                }
            });
            setNotifications(response.data);
            if (response.data.length === 0) {
                setnomessage(true);
            } else {
                setnomessage(false);
            }
        } catch (error) {
            console.error("Error in message fetch", error);
        }
    };

    return (

        <div style={{ height: '100%' }}>
            <div style={{ width: '100%', height: '100%', overflowY: 'scroll', scrollbarWidth: 'none', backgroundColor: '#f0f6fa' }}>
                <div style={{ height: '90%' }}>
                    <div style={{ borderBottom: '1px solid #ccc', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
                        <div>

                            <h1 style={{ width: '100%', margin: '20px 0', position: 'sticky', top: '0', fontSize: '24px', padding: '0 5vw' }}>Notifications</h1>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <h3 style={{ display: 'flex' }}>Last:
                                <select onChange={(e) => setDays(e.target.value)}>
                                    <option value="1000">All</option>
                                    <option value="1">1 day</option>
                                    <option value="2">2 days</option>
                                    <option value="4">4 days</option>
                                    <option value="7">1 week</option>
                                    <option value="30">1 month</option>
                                </select>
                            </h3>
                        </div>
                    </div>

                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '2vh' }}>
                        {
                            notifications.map((notification, index) => (
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px', borderBottom: '1px solid #ccc' }} key={index}>
                                    <div style={{ maxWidth: '85%', height: '25px', overflowX: 'scroll', scrollbarWidth: 'none', display: 'flex', alignItems: 'center' }}>
                                        <h3 style={{ fontWeight: '400', cursor: 'pointer', fontSize: '17px', height: '18px', width: 'auto' }}>{notification.message}</h3>
                                    </div>
                                    <div>
                                        <h3>
                                            {(notification.created_at).substring(0, 10)}
                                        </h3>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {
                        nomessage && (
                            <div>
                                <h3 style={{ textAlign: 'center', fontWeight: '400' }}>No notifications !!!</h3>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
