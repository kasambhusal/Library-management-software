import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { message } from 'antd';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import server from '../myServer/Server';
import forgotimg from '/forgot.jpg'
export default function ForgotPassword({ setIsAuthenticated }) {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const [gotCheck, setGotCheck] = useState([]);
    const [otp, setOtp] = useState("");
    const [checkEmail, setCheckEmail] = useState(false);
    const myemail = state.myemail
    const [email, setEmail] = useState(`${myemail}`);
    const geturl = `${server}/api/checkOtp?email=`;
    const posturl = `${server}/forgot-password`;
    useEffect(() => {
        setIsAuthenticated(false)
    }, [])
    console.log(myemail)
    const checkOtp = async (e) => {
        e.preventDefault();
        await axios.get(geturl + email)
            .then(response => { setGotCheck(response.data[0]) })
            .catch(error => console.error(error))
        // console.log(gotCheck)
        // console.log(gotCheck.mail_id, gotCheck.OTP)
        if (gotCheck.mail_id == email && gotCheck.OTP == otp) {
            console.log("This is inside")
            console.log("This is inside")
            message.success("Congratulation Your email and OTP matches")
            navigate('/changepassword', { state: { email: { email } } });
        }
        else {
            message.error("Please provide correct OTP")
        }
        console.log("This is outside")
    }
    const checkEmailDomain = (email) => {
        return email.includes('@gmail.com');
      };
    const postForOtp = async (e) => {
        e.preventDefault();
        setCheckEmail(checkEmailDomain(email));
        if (checkEmail){  
                
            try {
                const response = await axios.post(posturl, {
                    email: email,
                });
                console.log(response.data);
                if(response){
                message.success("Please check your E-mail")

            }
        } catch (error) {
            console.error("Error fetching OTP: ", error);
            message.error("Error on Email sending")
        }
        }
        else{
            message.error("Please enter your gmail !!!")
        }
        

    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                minHeight: "89vh",
                backgroundColor: "#e1e3f0",
            }}
        >
            <div style={{
                display:'flex',
                flexWrap:'wrap-reverse',
                border: "2px solid #777c85",
                    borderRadius: "10px",
                    boxShadow: "3px 3px 16px black",
                    backgroundColor: "white",}}>

            <div
                style={{
                    minWidth: "30vw",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: '70vh',
                    alignItems:'center',
                    // justifyContent:'center'
                    
                }}
            >
                <h2 style={{ textAlign: "center",margin:'25px 0 15px 0' }}>Forgot something?</h2>
                <p style={{fontSize:'14px',width:'70%',textAlign:'center'}}>
                    Enter your email below to receive password reset instructions.
                </p>
                <form onSubmit={checkOtp}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection:'column',
                            minWidth: "25vw",
                            minHeight: "15h",
                            margin: "5vh 0",
                            gap:'4vh'
                            // justifyContent: "space-around",
                        }}
                        >
                        
                            <div style={{width:'100%'}}>
                                <label htmlFor="email" style={{fontSize:'18px',fontWeight:'500',display:'block',margin:'10px 0'}}>Email :</label>
                                <input
                                    value={email}
                                    type="email"
                                    style={{
                                        border: "1px solid black",
                                        borderRadius: "5px",
                                        padding: "3px 8px",
                                        width: "100%",
                                        margin:'0 0 10px 0'
                                    }}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email"
                                    />

                                    <div style={{display:'flex',justifyContent:'right'}}>

                                <button
                                    onClick={postForOtp}
                                    style={{
                                        padding: "2px",
                                        border: "1px solid black",
                                        borderRadius: "3px",
                                        cursor: "pointer",
                                    }}
                                    >
                                    Get OTP
                                </button>
                                    </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <label htmlFor="password">Enter OTP :</label>
                                <input
                                    value={otp}
                                    type="text" // Changed to text for input
                                    id="myOtp"
                                    style={{
                                        border: "1px solid black",
                                        borderRadius: "5px",
                                        padding: "3px 8px",
                                    }}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter Valid OTP"
                                    />
                            </div>
                        
                    </div>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                        <button
                            type="submit"
                            id="box"
                            style={{
                                padding: "5px 8px",
                                border: "1px solid blue",
                                margin: "0 20px",
                                borderRadius: "10px",
                                backgroundColor: "rgb(138, 189, 230)",
                                cursor: "pointer",
                            }}
                            >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
            <div style={{borderRadius:'10px'}}>
                <img src={forgotimg} alt="forgot_image" style={{minWidth:'30vw',height:'60vh',borderRadius:'10px'}}/>
            </div>
                            </div>
        </div>
    )
}
