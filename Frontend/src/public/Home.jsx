import React, { useEffect, useState } from 'react';
import img1img from '/img1.png';
import img2img from '/img2.jpg';
import img3img from '/img3.jpg';
import img4img from '/img4.jpg';
import img5img from '/img5.png';
import img6img from '/img6.jpg';
import img7img from '/img7.jpg';
import img8img from '/img8.jpg';
import { message } from 'antd';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import AOS from "aos";
import "aos/dist/aos.css";
import server from '../myServer/Server';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

export default function Home({ setIsAuthenticated }) {
    const navigate = useNavigate();

    const [second_popup, setSecond_popup] = useState('If you are experiencing some bugs please let us know !');
    const url = `${server}/api/message`;
    const Post_message = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries());
        if (!formObject) {
            message.error("Please fill the form")
        }
        else {
            message.success("Message sended successfully")
            await axios.post(url, formObject);
        }

    };
    let myobject = [];
    useEffect(() => {
        setIsAuthenticated(false)
        // sessionStorage.setItem('Token', null)
        const cookieToken = getCookies('Token')

        if (cookieToken) {
            sessionStorage.setItem('Token', cookieToken)
            const token = cookieToken;
            const decodedToken = jwtDecode(token);
            myobject = decodedToken.user[0];
            if (myobject.section === "admin") {
                navigate('/dashboard/1/modifybooks')
                setIsAuthenticated(true)
            }
            else if (myobject.section === "student") {

                navigate('/dashboard/2/sbook')
            }
            setIsAuthenticated(true)
        }
        else {
            setIsAuthenticated(false)
        }
        AOS.init({ duration: 1000 });
    }, [])
    const getCookies = (name) => {
        return Cookies.get(name)
    }
    // const boxStyle1 = {
    //     '--i': 1
    // }
    // const boxStyle2 = {
    //     '--i': 2
    // }
    // const boxStyle3 = {
    //     '--i': 3
    // }
    // const boxStyle4 = {
    //     '--i': 4
    // }
    // const boxStyle5 = {
    //     '--i': 5
    // }
    // const boxStyle6 = {
    //     '--i': 6
    // }
    // const boxStyle7 = {
    //     '--i': 7
    // }
    // const boxStyle8 = {
    //     '--i': 8
    // }
    return (
        <>
            <div className='bg_pic' style={{ width: '100%', height: '91vh', top: '9vh', position: 'fixed', zIndex: '-1', boxShadow: '0px 0px 96px black inset' }}>
            </div>
            <div>

                <div style={{ width: '100%', height: '91vh', display: 'flex', gap: '40px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: '400', color: 'white', textShadow: ' 4px 5px black' }} data-aos="fade-down">श्री माध्यमिक विद्यालय, इमिलिया</h1>
                    <h2 style={{ textAlign: 'center', color: 'white', fontSize: '2rem', fontWeight: '300', textShadow: ' 2px 2px black' }} data-aos="fade-up">पुस्तकालय व्यवस्थापनको लागि अनलाइन प्रणाली</h2>
                </div>
                {/* <div className="body">

            <div className="box">
            <span style={boxStyle1}><img src={img1img} alt="image1" /></span>
            <span style={boxStyle2}><img src={img2img} alt="image2" /></span>
            <span style={boxStyle3}><img src={img3img} alt="image3" /></span>
            <span style={boxStyle4}><img src={img4img} alt="image4" /></span>
            <span style={boxStyle5}><img src={img5img} alt="image5" /></span>
            <span style={boxStyle6}><img src={img6img} alt="image6" /></span>
            <span style={boxStyle7}><img src={img7img} alt="image7" /></span>
            <span style={boxStyle8}><img src={img8img} alt="image8" /></span>
            </div>
            </div> */}
                <div className='H_contact'>
                    <h1 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: '400', color: '#544d4d', padding: '2vh 0' }}>सम्पर्क</h1>

                    <div className='homeMessageBox' >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5vh', width: 'auto', minHeight: '50vh' }} data-aos="fade-right">
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '15vw' }}>
                                <ion-icon size="large" style={{ opacity: '0.6' }} name="location-outline"></ion-icon>
                                <h2 style={{ color: '#4191d9', fontWeight: '200' }}>बुद्धभूमि नगरपालिका</h2>
                                <h2 style={{ color: '#4191d9', fontWeight: '200' }}>प्रदेश नं. ५, नेपाल</h2>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '15vw' }}>
                                <ion-icon size="large" style={{ opacity: '0.6' }} name="mail-open-outline"></ion-icon>
                                <h2 style={{ color: '#4191d9', fontWeight: '200' }}>info@maviimiliya.edu.np</h2>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '15vw' }}>
                                <ion-icon size="large" style={{ opacity: '0.6' }} name="call-outline"></ion-icon>
                                <h2 style={{ color: '#4191d9', fontWeight: '200' }}>Support: 076-420001</h2>
                            </div>
                        </div>

                        <div className='message' data-aos="fade-left">
                            <h2 style={{ textAlign: 'center', margin: '10px 0' }}>Message us:</h2>
                            <form onSubmit={Post_message}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                                    <input name='name' type="text" placeholder='Name' style={{ padding: '3px 5px', width: '80%', margin: '0 10%', border: '1px solid #c2bcac' }} />
                                    <input name='email' type="email" placeholder='Email' style={{ padding: '3px 5px', width: '80%', margin: '0 10%', border: '1px solid #c2bcac' }} />
                                    <input name='phoneno' type="number" placeholder='Phone: 98xxxx' style={{ padding: '3px 5px', width: '80%', margin: '0 10%', border: '1px solid #c2bcac' }} />
                                    <textarea name='messages' rows={5} placeholder='Message' style={{ padding: '3px 5px', width: '80%', margin: '0 10%', border: '1px solid #c2bcac' }} />
                                </div>
                                <button type='submit' style={{ backgroundColor: '#4991de', border: 'none', borderRadius: '3px', color: 'white', padding: '4px 8px', margin: '20px', cursor: 'pointer' }}>Send</button>
                            </form>
                            {<p style={{ textAlign: 'center', fontSize: '15px' }}>{second_popup}</p>}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}
