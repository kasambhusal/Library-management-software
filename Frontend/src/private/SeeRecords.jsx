import server from '../myServer/Server';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InitialBookGive from './InitialBookGive';
import InitialBookTake from './InitialBookTake';
export default function Seerecords() {
  const [status, setStatus] = useState('');
  const [records, setRecords] = useState([]);
  const url = `${server}/api/records`;



  useEffect(() => {
    axios.get(url, { params: { status } })
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching records", error);
      });
    // Other logic remains the same...
  }, [status]); // Include status as a dependency


  const changedStatus = async (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus)
    try {
      const response = await axios.get(url, {
        params: { status: selectedStatus }
      });
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records", error);
    }

  }
  return (
    <>

      <div style={{ width: '100%', height: '100%', padding: '0 0 1vh 0', borderRadius: '10px' }}>
        <div style={{ backgroundColor: '#f0f6fa', overflowY: 'scroll', scrollbarWidth: 'none', width: '100%', display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'center', minHeight: '90%' }}>
          <h1 style={{ textAlign: 'center', width: '100%', margin: '20px 0' }}>Records</h1>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'right', margin: '0 2vw 0 0' }}>
            <p>Status :- <select onChange={changedStatus}>
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="success">Success</option>
              <option value="completed">Completed</option>
            </select></p>
          </div>
          <div style={{ width: '95%', border: '1px solid black', borderRadius: '7px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <table style={{ width: '99%', borderCollapse: 'collapse' }}>
              <thead>

                <tr style={{ borderBottom: '1px solid #ccc', fontSize: '20px' }}>
                  <th style={{ fontSize: '22px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}> Student name</th>
                  <th style={{ fontSize: '22px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}> Book name</th>
                  <th style={{ fontSize: '22px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}> Request</th>
                  <th style={{ fontSize: '22px', padding: '10px 0', textAlign: 'right', paddingRight: '10px' }}> Given / Return</th>
                </tr>
              </thead>
              <tbody>

                {
                  records.map((record) => {
                    return (
                      <tr key={record.id} style={{ borderBottom: '1px solid #ccc' }}>
                        <td style={{ fontSize: '18px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>{record.s_name}</td>
                        <td style={{ fontSize: '18px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>{record.b_name}</td>


                        {
                          record.status === "pending" ?
                            <>

                              <td style={{ color: 'red', fontSize: '18px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>{record.status}</td>
                              <td style={{ color: 'red', fontSize: '18px', padding: '10px 0', textAlign: 'right', paddingRight: '20px' }}>

                                <InitialBookGive id={record.id} s_name={record.s_name} b_name={record.b_name} s_email={record.email} />
                              </td>

                            </>
                            :
                            <>
                              <td style={{ color: 'green', fontSize: '18px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>{record.status}</td>
                              {
                                record.status !== "completed" ? (

                                  <td style={{ color: 'green', fontSize: '18px', padding: '10px 0', textAlign: 'right', paddingRight: '20px' }}>
                                    <InitialBookTake id={record.id} s_name={record.s_name} b_name={record.b_name} s_email={record.email} />
                                  </td>

                                ) : (
                                  <td style={{ color: 'green', fontSize: '18px', padding: '10px 0', textAlign: 'right', paddingRight: '20px' }}>Returned</td>

                                )}
                            </>
                        }
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
