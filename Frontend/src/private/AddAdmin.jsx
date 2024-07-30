import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InitialAdminDelete from './InitialAdminDelete';
import server from '../myServer/Server';

export default function AddAdmin() {
   const [admins, setAdmins] = useState([]);
  const url = `${server}/api/addAdmin`;

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error("Error on admin fetching", error);
      });

  }, []);

  return (
    <>
      
      <div style={{ width: '100%', height: '100%', borderRadius: '10px'}}>
        <div style={{ backgroundColor:'#f0f6fa', borderRadius: '10px', overflow: 'scroll', scrollbarWidth: 'none', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', height: '100%' }}>
          <h1 style={{ textAlign: 'center', width: '100%', margin: '20px 0', position: 'sticky', top: '0', fontSize: '24px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>List of Admins</h1>

          <div style={{ width:'95%',display:'flex',justifyContent:'center',border: '1px solid black', borderRadius: '7px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',}}>
          <table style={{ width: '99%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc'  }}>
                <th style={{  padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>Admin Name</th>
                <th style={{ padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>Admin ID</th>
                <th style={{ padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>Admin Email</th>
              </tr>
            </thead>
            <tbody>

              {admins.map((admin) => (
                <tr  key={admin.id} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '10px 0', textAlign: 'left', paddingLeft: '10px'}}>{admin.name}</td>
                  <td style={{ padding: '10px 0', textAlign: 'left', paddingLeft: '30px'}}>{admin.id}</td>
                  <td style={{ padding: '10px 0', textAlign: 'left', paddingLeft: '10px'}}>{admin.mail_id}</td>
                  <td style={{ padding: '10px 0', textAlign: 'left', paddingLeft: '10px'}}>
                  <InitialAdminDelete id={admin.id} name={admin.name} email={admin.mail_id}/>
                  </td>
                </tr>
              ))}
              </tbody>
          </table>
              </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '30px', paddingRight: '20px' }}>
            <button style={{ padding: '10px 20px', border: '1px solid blue', borderRadius: '5px', backgroundColor: '#5164db', cursor: 'pointer' }}>
              <Link to="/dashboard/aadmin" style={{ textDecoration: 'none', color: 'white', fontSize: '18px' }}>Add Admin</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
