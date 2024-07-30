import server from '../myServer/Server';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function Srecords() {
  const [object, setObject] = useState({});
  const [records, setRecords] = useState([]);
  const url = `${server}/api/srecords`;
  const token = sessionStorage.getItem('Token');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setObject(decodedToken.user[0]);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    } else {
      console.log('No token found');
    }
  }, [token]);

  useEffect(() => {
    if (object.mail_id) {
      axios.get(url, {
        params: { email: object.mail_id }
      })
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching records:", error);
      });
    }
  }, [object.mail_id]);

  return (
    <>
      <div style={{ width: '100%', height: '100%', overflowY: 'scroll', padding: '0 0 1vh 0', borderRadius: '10px' }}>
        <div style={{ backgroundColor: '#f0f6fa', overflowY: 'scroll', scrollbarWidth: 'none', width: '100%', display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'center', minHeight: '90%' }}>
          <h1 style={{ textAlign: 'center', width: '100%', margin: '20px 0', position: 'sticky', top: '0'}}>Records</h1>
          <div style={{ width: '95%', border: '1px solid black', borderRadius: '7px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <table style={{ width: '99%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ccc', fontSize: '20px' }}>
                  <th style={{ fontSize: '22px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>Book name</th>
                  <th style={{ fontSize: '22px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>Book ID</th>
                  <th style={{ fontSize: '22px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>Taken Date</th>
                  <th style={{ fontSize: '22px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>Given Date</th>
                  <th style={{ fontSize: '22px', padding: '10px 0', textAlign: 'right', paddingRight: '10px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} style={{ borderBottom: '1px solid #ccc' }}>
                    <td style={{ fontSize: '18px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>{record.b_name}</td>
                    <td style={{ fontSize: '18px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>{record.b_id}</td>
                    <td style={{ fontSize: '18px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>{record.t_date}</td>
                    <td style={{ fontSize: '18px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>{record.g_date}</td>
                    <td style={{ fontSize: '18px', padding: '10px 0', textAlign: 'right', paddingRight: '20px', color: record.status === "pending" ? 'red' : (record.status === "success" ? 'green' : 'blue') }}>{record.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
