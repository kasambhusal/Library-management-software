import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import server from '../myServer/Server';

export default function Sbook() {
    const [per, setPer] = useState('none');
    const [books, setBooks] = useState([]);
    const [clas, setClas] = useState('');
    const url = `${server}/api/sbook`;

    const getBooks = () => {
        axios.get(url, {
            params: {
                class: clas // Send class as query parameter
            }
        })
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => {
                console.error("Error on book fetching", error);
            })
    };

    useEffect(() => {
        getBooks();

    }, [clas]); // useEffect dependency on 'clas'

    return (
        <>
           
            <div style={{ width: '100%', height: '100%', overflowY: 'scroll', borderRadius: '10px' }}>
                <div style={{ backgroundColor: '#f0f6fa', scrollbarWidth: 'none', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', minHeight: '100%', paddingBottom: '2vh' }}>
                    <h1 style={{ textAlign: 'center', width: '100%', margin: '20px 0', position: 'sticky', top: '0', fontSize: '24px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>List of Books</h1>

                    {/* Class selection */}
                    <div style={{ height: '40px', width: '100%', display: 'flex', justifyContent: 'right', paddingRight: '0.8vw' }}>
                        <p style={{ fontSize: '25px', backgroundColor: 'white' }}>Class:- </p>
                        <select onChange={(e) => { setClas(e.target.value); }} value={clas} style={{ border: '1px solid #ccc', height: '40px', fontSize: '18px', borderRadius: '5px', padding: '0 10px', minWidth: '100px' }}>
                            <option value=""></option>
                            <option value="0">Special</option>
                            {[...Array(13).keys()].slice(1).map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{width:'90%',height:'90%',padding:'0 0 2vh 0',display:'flex', scrollbarWidth: 'none',justifyContent:'center', border: '2px solid black',borderRadius:'10px', boxShadow: '2px 2px 10px black'}}>

          <table style={{ width: '99%',borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc', fontSize: '20px' }}>
                <th style={{ fontSize: '22px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>Book Name</th>
                <th style={{ fontSize: '22px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>Book ID</th>
                <th style={{ fontSize: '22px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>Book Class</th>
              </tr>
            </thead>
            <tbody>
                    {books.map((book) => (
                        <tr key={book.id}  className={book.id} style={{ borderBottom: '1px solid #ccc' }}>
                            <td style={{ fontSize: '18px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>
                            <Link to={`/dashboard/lbook/${book.id}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>{book.name}</Link>
                            </td>
                            <td style={{ fontSize: '18px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>{book.id}</td>
                            <td style={{ fontSize: '18px', padding: '10px 0', textAlign: 'left', paddingLeft: '10px' }}>{book.class}</td>

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

