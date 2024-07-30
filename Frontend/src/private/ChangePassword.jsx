import { message } from 'antd';
import server from '../myServer/Server';
import axios from 'axios';
import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export default function ChangePassword() {
  const location = useLocation();
  const { state } = location;
  const navigate=useNavigate();
  const email=state.email.email;
  const url = `${server}/changepassword`;
  const changePassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());

    console.log(formObject)
    if (formObject.newPassword === formObject.conformNewPassword) {
      const myNewPassword=formObject.newPassword;
      const myObject={
        "email":{email},
        "password":{myNewPassword}
      }
      console.log(myObject)
      await axios.post(url,myObject)
      .then(response=>{
        console.log(response);
        message.success("Password Changed Successful")
        setTimeout(() => {
          navigate('/login')
        }, 1000);
      })
      .catch(error=>{
        console.log(error);
        message.error("Something went Wrong !")
      })
    }
    else {
      message.error("sorry")
    }
  }
  return (
    <div style={{ width: '100%', height: '88vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0eded' }}>
      <div style={{ minHeight: '60vh', minWidth: '40vw', border: '8px groove #575656', borderRadius: '5px', boxShadow: '5px 5px #8c8989', padding: '5vh 1vw' }}>
        <h2 style={{ textAlign: 'center' }}>Change Your Password</h2>
        <form onSubmit={changePassword}>
          <div style={{ display: 'flex', width: '100%', padding: '2vh 2vw', justifyContent: 'space-around', margin: '2vh 0' }}>
            <label htmlFor="newPassword" style={{ fontSize: '1.2rem', fontWeight: '500' }}>New Password :-</label>
            <input style={{ padding: '5px 7px', border: '1px solid black', fontSize: '1.1rem', borderRadius: '5px' }} name='newPassword' type="text" placeholder='Enter new password' />
          </div>

          <div style={{ display: 'flex', width: '100%', padding: '2vh 2vw', justifyContent: 'space-around', margin: '2vh 0' }}>
            <label htmlFor="conformNewPassword" style={{ fontSize: '1.2rem', fontWeight: '500' }}>Conform Password :-</label>
            <input style={{ padding: '5px 7px', border: '1px solid black', fontSize: '1.1rem', borderRadius: '5px' }} name='conformNewPassword' type="text" placeholder='Conform new password' />

          </div>

          <div style={{ display: 'flex', justifyContent: 'right', padding: '0 2vw 0 0' }}>

            <button type='submit' style={{ padding: '5px 8px', border: '1px solid black', borderRadius: '3px', backgroundColor: 'blue', color: 'white', fontWeight: '600', cursor: 'pointer' }}>Change Password</button>
          </div>

        </form>
      </div>
    </div>
  )
}
