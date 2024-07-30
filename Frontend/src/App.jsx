import './App.css';
import { RouterProvider } from 'react-router-dom';
import Routing from './Routing'
import { useState,useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Cookies from 'js-cookie';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [popup, setPopup] = useState(false);
  const handleLogout = () => {

      setIsAuthenticated(false);
      localStorage.setItem('Token',null)
      setCookies('Token','')
      setPopup(true)
      // Perform any additional logout operations here
  
  };
  const setCookies=(name,value)=>{
    return Cookies.set(name,value)
  }
  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => {
        setPopup(false);
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
    AOS.init({ duration: 1000 });
  }, [popup]);
  return (  
    <>
    {
      popup &&(
        <div style={{zIndex:'2',border:'2px black orange',borderRadius:'7px',fontSize:'1.4rem',padding:'5px 10px',backgroundColor:'#deb33c',fontWeight:'bold',position:'absolute',top:'13vh',right:'20px'}}
        data-aos="fade-left"
        >
          LogOut Success !
        </div>
      )
    }
  <RouterProvider router={Routing({
    isAuthenticated,
    handleLogout,
    setIsAuthenticated
  })}
/>
  </>

    
  );
}

export default App;
