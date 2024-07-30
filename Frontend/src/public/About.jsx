import React, { useState, useEffect } from 'react'
import img3img from '/img1.png';
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from './Footer';
export default function About({ setIsAuthenticated }) {
  const [autoText, setAutoText] = useState('');

  useEffect(() => {
    setIsAuthenticated(false)
    sessionStorage.setItem('Token', null)
    AOS.init({ duration: 1000 });
  }, [])

  useEffect(() => {
    const textToWrite = "Welcome to Shree Secondary School, Imiliya, renowned as the premier educational institution in Kapilvastu. Committed to delivering quality education with a focus on equality, our school ensures a nurturing environment where every child thrives. Equipped with dedicated computer systems, filtered water facilities, and a spacious playground, we offer personalized learning sessions facilitated by highly qualified and experienced teachers. Our curriculum spans from classes 1 to 12, catering to both English and Nepali mediums, with specialized tracks in Management, English, Nepali, and Computer Engineering for grades 9 to 12. At Shree Secondary School, we promise an educational journey that prepares students for a successful future.";
    const delay = 35; // Adjust the delay between characters typed

    let index = 0;
    const interval = setInterval(() => {
      if (index <= textToWrite.length) {
        setAutoText(textToWrite.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    // Cleanup function to prevent memory leaks
    return () => clearInterval(interval);
  }, []);
  const handleInputChange = (e) => {
    e.preventDefault();
    // Optionally, you could provide feedback that editing is disabled
    console.log("Editing is disabled.");
  };
  return (
    <>
      <div style={{ zIndex: '-1', position: 'fixed', width: '100%', height: '88vh', backgroundImage: `url(${img3img})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        {/* <img src={img3img} alt="image"  style={{width:'100%',height:'100%'}}/> */}
      </div>
      <div style={{ height: '200vh', display: 'flex', flexDirection: 'column', alignItems: "end", width: '100%' }}>
        <div
          style={{ width: '50vw', margin: '10vh 5vw 0 0', minHeight: '50vh', background: '#c4c4c4', fontSize: '1.2rem', border: 'none', border: '5px double black', boxShadow: '1px 1px black ', padding: '20px', borderRadius: '0 40px 0 40px' }}
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
        >

          {autoText}
        </div>

      </div>
      <Footer />
    </>
  )
}
