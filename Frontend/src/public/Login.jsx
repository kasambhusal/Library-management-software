import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import loginlogoimg from '/loginlogo.jpg'
import server from '../myServer/Server';
import Cookies from 'js-cookie';
import { message } from "antd";
import { useNavigate } from 'react-router-dom';
const Login = ({ setIsAuthenticated, isAuthenticated }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [admin, setAdmin] = useState("");
  const url = `${server}/api/login`;

  const get = async () => {
    try {
      const response = await axios.get(url, {
        params: { email, password },
      });

      const token = response.data.token;
      if (!token) {
        setIsAuthenticated(false)
      }
      sessionStorage.setItem("Token", token);
      setCookies('Token', token, 365);

      const userData = response.data.userData[0];
      setAdmin(userData.section);

      setShowPopup(true);
      setErrorMessage("Login success");
      setEmail("");
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching products: ", error);
      setErrorMessage("Sorry, but you entered the wrong email or password");
      setShowPopup(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("Loading.........");
    await get();
  };



  const handleForgot = (e) => {
    e.preventDefault();

    navigate('/forgotpassword', { state: { myemail: email } })
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [showPopup]);

  const setCookies = (name, mytoken, days) => {
    return Cookies.set(name, mytoken, { expires: days })
  }
  const getCookies = (name) => {
    return Cookies.get(name)
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "91vh",
        backgroundColor: "#e1e3f0",
      }}
    >
      <div className="loginBox"

      >
        <div style={{ width: '100%', height: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={loginlogoimg} alt="login" style={{ width: '200px', height: '200px' }} />
        </div>
        <form onSubmit={handleLogin}>
          <div
            style={{
              display: "flex",
              width: "100%",
              // height: "15h",
              margin: "5vh 0",
              justifyContent: "space-around",
            }}
          >

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "70%",
                gap: "3vh",
              }}
            >
              <div style={{ borderBottom: '2px solid black', }}>
                <ion-icon size="30px" name="mail-outline" style={{ margin: '0 20px' }}></ion-icon>
                <input className="loginInput"
                  value={email}
                  type="email"
                  style={{
                    outline: 'none',
                    border: 'none',
                    padding: "3px 8px",
                    fontWeight: 'bold',
                    maxWidth: '80%'
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email ID"
                />
              </div>
              <div style={{ borderBottom: '2px solid black', display: "flex", justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                  <ion-icon size="medium" name="lock-closed-outline" style={{ margin: '0 20px' }}></ion-icon>
                  <input className="loginInput"
                    value={password}
                    type={showPassword ? "text" : "password"}
                    id="myInput"
                    style={{
                      outline: 'none',
                      border: 'none',
                      fontWeight: 'bold',
                      padding: "3px 8px",
                      maxWidth: '80%'
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>
                  <ion-icon name="eye-outline"></ion-icon>
                </div>
              </div>
            </div>
          </div>

          <p
            style={{
              color: "blue",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 'bold',
              cursor: "pointer",
              margin: "10px 0",
            }}
            onClick={handleForgot}
          >
            forgot password ?
          </p>
          <button
            type="submit"
            id="box"
            style={{
              padding: "3px 5px",
              border: "1px solid blue",
              margin: "4vh 10%",
              borderRadius: "10px",
              backgroundColor: "rgb(138, 189, 230)",
              cursor: "pointer",
              width: "80%",
            }}
          >
            LogIn
          </button>
        </form>

        {errorMessage && (
          <p style={{ textAlign: "center", fontSize: "15px" }}>
            {errorMessage}
          </p>
        )}


      </div>
      {showPopup && (
        <div
          id="popup"
          style={{
            position: "absolute",
            top: "12.3vh",
            right: "10px",
            border: "1px solid orange",
            borderRadius: "5px",
            padding: "4px 6px",
            width: "200px",
            height: "40px",
            backgroundColor: "rgb(244, 189, 88)",
            fontWeight: "bold",
          }}
          data-aos="fade-left"
        >
          LogIn Sucess !
        </div>
      )}
      {isAuthenticated && (
        <div
          id="dashboard"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "12.3vh",
            left: "10px",
            border: "1px solid blue",
            borderRadius: "5px",
            padding: "auto",
            width: "250px",
            height: "80px",
            backgroundColor: "aquamarine",
            fontWeight: "bold",
          }}
          data-aos="fade-right"
        >
          {admin === "admin" ? (
            <Link
              to="/dashboard/1"
              style={{ textDecoration: "none", fontSize: "1.4rem" }}
            >
              Goto My Dashboard
            </Link>
          ) : (
            <Link
              to="/dashboard/2"
              style={{ textDecoration: "none", fontSize: "1.4rem" }}
            >
              Goto My Dashboard
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
