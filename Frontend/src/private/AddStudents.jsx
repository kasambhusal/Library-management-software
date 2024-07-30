import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import server from '../myServer/Server';
import InitialStudentDelete from './InitialStudentDelete';

const AddStudents = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [sClass, setSClass] = useState("");
  const url = `${server}/api/login/student`;
  const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    // Fetch all students initially
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const response = await axios.get(url);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  const searchStudents = async () => {
    try {
      const response = await axios.get(url, {
        params: {
          name: name,
          myclass: sClass
        }
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Error searching students", error);
    }
  };

  return (
    <>
      <div style={{ width: '100%', height: '100%', borderRadius: '10px' }}>
        <div style={{ backgroundColor: '#f0f6fa', overflowY: 'scroll', scrollbarWidth: 'none', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', height: '100%' }}>
          <h1 style={{ textAlign: 'center', width: '100%', margin: '20px 0', position: 'sticky', top: '0', fontSize: '24px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>List of Students</h1>
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <select
              style={{ padding: '5px 6px', border: '1px solid black', borderRadius: '3px' }}
              onChange={(e) => {
                const selectedClass = e.target.value;
                setSClass(selectedClass);
              }}>
              <option key={0} value="">Class All</option>
              {classes.map(classs => (
                <option key={classs} value={classs}>Class {classs}</option>
              ))}
            </select>
            <input
              type="text"
              style={{
                width: '250px',
                fontWeight: '500',
                marginRight: '50px',
                padding: '5px 8px',
                border: '1px solid black',
                borderRadius: '3px',
              }}
              placeholder='Enter student name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: '#5164db', cursor: 'pointer', color: 'white', border: 'none' }}
              onClick={searchStudents}
            >
              Search
            </button>
          </div>
          <div style={{ width: '95%', border: '1px solid black', borderRadius: '7px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <table style={{ width: '99%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ccc' }}>
                  <th style={{ padding: '0px 0', textAlign: 'left', paddingLeft: '0px' }}> Name</th>
                  <th style={{ padding: '0px 0', textAlign: 'left', paddingLeft: '0px' }}> ID</th>
                  <th style={{ padding: '0px 0', textAlign: 'left', paddingLeft: '0px' }}> Email</th>
                  <th style={{ padding: '0px 0', textAlign: 'left', paddingLeft: '0px' }}> Class</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} style={{ borderBottom: '1px solid #ccc' }}>
                    <td style={{ padding: '5px 0', textAlign: 'left', paddingLeft: '5px' }}>{student.name}</td>
                    <td style={{ padding: '5px 0', textAlign: 'left', paddingLeft: '5px' }}>{student.id}</td>
                    <td style={{ padding: '5px 0', textAlign: 'left', paddingLeft: '5px' }}>{student.mail_id}</td>
                    <td style={{ padding: '5px 0', textAlign: 'left', paddingLeft: '5px' }}>{student.class}</td>
                    <td style={{ display: 'flex', justifyContent: 'right', padding: '0 0px' }}>
                      <InitialStudentDelete id={student.id} name={student.name} email={student.mail_id} classs={student.class}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '30px', paddingRight: '20px' }}>
            <button style={{ padding: '10px 20px', border: '1px solid blue', borderRadius: '5px', backgroundColor: '#5164db', cursor: 'pointer' }}>
              <Link to="/dashboard/astudent" style={{ textDecoration: 'none', color: 'white', fontSize: '18px' }}>Add Student</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStudents;
