import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Dashboard({ setIsAuthenticated }) {
  const [go, setGo] = useState(true);

  useEffect(() => {

    const token = getCookie('Token');
    sessionStorage.setItem('Token', token)
    checkToken(token);
  }, []);
  const checkToken = (token) => {
    if (!token) {
      setIsAuthenticated(false)
      setGo(false)
    }
    else if (token) {
      setIsAuthenticated(true)
      setGo(true)
    }
  }
  const getCookie = (name) => {
    return Cookies.get(name)
  }
  let i = 1;

  const err = () => {

    for (i = 1; i < 10; i++) {
      message.error("Please login")
    }
  }
  return (
    go ? <Outlet /> : err()
  );
}
