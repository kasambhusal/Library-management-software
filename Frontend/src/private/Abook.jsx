import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {message} from 'antd'
import server from '../myServer/Server';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';


export default function Abook() {
  const [category, setCategory] = useState('');
  const [classes, setClasses] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mymessage, setMymessage] = useState('Please Enter details of the book');
  const [date, setDate] = useState('');
  const dateurl = `${server}/api/abook/date`;
  const categoryurl = `${server}/api/abook/category`;
  const bookurl = `${server}/api/book/add`;
  const messageurl = `${server}/api/post/message`;
  // let myobject = [];
  const token = sessionStorage.getItem('Token');
  useEffect(() => {
    if (token) {
      try {
        const decodedToken= jwtDecode(token);
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
  useEffect(() => {
    AOS.init({ duration: 1000 });

    axios.get(dateurl)
      .then((response) => setDate(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);

    axios.get(categoryurl, {
      params: { requ: selectedCategory }
    })
      .then((response) => setClasses(response.data))
      .catch((error) => console.error(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
      console.log(formObject)

    axios.post(bookurl, formObject)
      .then(response => {
        setClasses(response.data);
        setMymessage('Successfully Added!');
        message.success("Book Added ")
        if(response){
          const messageObject = {
            email: email,
            section: "admin",
            seen:"unseen",
            message: `${name} added a book named ${formObject.name} of class ${formObject.class}.`
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
        resetForm();
      })
      .catch(error => {
        console.error(error);
        setMymessage('Sorry, something went wrong!');
        message.error("Something went Wrong !")
      });
  };

  const resetForm = () => {
        document.getElementById('bookForm').reset();
  };

  return (
    <>

      <form  onSubmit={handleSubmit}>
        <div style={{ width: '100vw', minHeight: '88vh', backgroundColor: '#cfcbc2', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className='boxForm' style={{ height: 'auto', border: '7px groove #5c5648', borderRadius: '10px', boxShadow: '3px 3px #87847b', padding: '0 2vw 2vw 2vw', margin: '3vh 0 ' }}>
            <div style={{ display: 'flex', justifyContent: 'right', marginRight: '-2vw' }}>
              <div style={{ width: '30px', height: '30px', backgroundColor: '#e80523', color: 'white', fontWeight: 'bold', fontSize: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', borderRadius: '5px' }}>
                <Link to="/dashboard/1/modifybooks" style={{ textDecoration: 'none', color: 'white' }}>X</Link>
              </div>
            </div>
            <h1 style={{ textAlign: 'center' }}>Add Book</h1>
            <div style={{ display: 'flex', margin: '3vh 1vw', height: '80%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '35%', height: '100%', gap: '20px' }}>
                <label style={{ fontSize: '25px', fontWeight: 'bold' }}>Id  :-</label>
                <label style={{ fontSize: '25px', fontWeight: 'bold' }}>Name  :-</label>
                <label style={{ fontSize: '25px', fontWeight: 'bold' }}>Category  :-</label>
                <label style={{ fontSize: '25px', fontWeight: 'bold' }}>Class :-</label>
                <label style={{ fontSize: '25px', fontWeight: 'bold' }}>Date :-</label>
                <label style={{ fontSize: '25px', fontWeight: 'bold' }}>Quantity :-</label>
                <label style={{ fontSize: '25px', fontWeight: 'bold' }}>Description :-</label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '65%', height: '100%', gap: '20px' }}>
                <input name='id' type="number" placeholder='Enter the ID of the book.......Must be unique' style={{ padding: '6px 10px', border: '1px solid black', borderRadius: '5px' }} required />
                <input name='name' type="text" placeholder='Enter the name of the book' style={{ padding: '6px 10px', border: '1px solid black', borderRadius: '5px' }} required />
                <select name="category" onChange={handleCategoryChange} required>
                  <option value="">Select Category</option>
                  <option value="Regular">Regular</option>
                  <option value="Special">Special</option>
                </select>
                <select name="class" required>
                  {classes && classes.length > 0 ? (
                    classes.map((myclass, index) => (
                      <option key={index} value={myclass}>{myclass}</option>
                    ))
                  ) : (
                    <option>No classes available</option>
                  )}
                </select>
                <input name='date' type="text" value={date} readOnly style={{ padding: '6px 10px', border: '1px solid black', borderRadius: '5px' }} required />
                <input type="number" name='quantity' placeholder='Quantity...' style={{ padding: '6px 10px', border: '1px solid black', borderRadius: '5px' }}  required/>
                <textarea name='description' id="area" rows={6} placeholder='Description......' style={{ padding: '6px 10px', border: '1px solid black', borderRadius: '5px' }} required />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{fontSize:'20px',fontWeight:'bold',color:'red'}}>{mymessage}</div>
              <button type='submit' style={{ cursor: 'pointer', padding: '4px 6px', border: '1px solid white', borderRadius: '6px', backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}>Save book</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
