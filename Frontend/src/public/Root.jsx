import React, { useEffect, useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import { Button, Drawer } from 'antd';
import logoimg from '/logo.jpeg'
export default function Root({ isAuthenticated, handleLogout }) {
    const [pc, setPc] = useState(true)
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        const width = window.innerWidth;
        if (width > 1000) {
            setPc(true)
        }
        else {
            setPc(false)
        }
        AOS.init({ duration: 2500 });
    }, [])
    return (
        <div>
            <nav className='nav'>
                <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <Link to="/">
                        <img className={pc ? 'logoPc' : 'logoMobile'} style={{ height: '8vh' }} src={logoimg} alt="logo" />
                    </Link>

                </div>

                {
                    pc ?
                        <div className="N_nav" >
                            <NavLink className={(e) => { return e.isActive ? "red" : "" }} style={{ textDecoration: 'none', color: 'blue' }} to="/">Home</NavLink>
                            <NavLink className={(e) => { return e.isActive ? "red" : "" }} style={{ textDecoration: 'none', color: 'blue' }} to="/about">About</NavLink>
                            <NavLink className={(e) => { return e.isActive ? "red" : "" }} style={{ textDecoration: 'none', color: 'blue' }} to="/contact">Contact Us</NavLink>
                            <button style={{ background: 'blue', border: 'none', padding: '5px 8px', fontSize: '16px', borderRadius: '3px', padding: '3px 7px' }}>
                                {isAuthenticated ? (
                                    <>
                                        <NavLink className={(e) => { return e.isActive ? "red" : "" }} onClick={handleLogout} style={{ textDecoration: 'none', color: 'white' }} to="/">LogOut</NavLink>

                                    </>
                                ) : (

                                    <NavLink className={(e) => { return e.isActive ? "red" : "" }} style={{ textDecoration: 'none', color: 'white' }} to="/login">Login</NavLink>
                                )
                                }
                            </button><img style={{ width: '40px', height: '40px' }} src="https://media.tenor.com/9Rt9JC45-54AAAAi/nepal-nepali.gif" alt="flag" />
                        </div>
                        :
                        <>
                            {/* <Button type="primary" >
                      Open
                    </Button> */}
                            <ion-icon name="menu-outline" onClick={showDrawer} size="large" style={{ zIndex: '5', display: 'absolute', top: '2vh', right: '3vh' }}></ion-icon>
                            <Drawer title="Nav Bar" onClose={onClose} open={open}>
                                <div style={{ display: 'flex', flexDirection: 'column', height: '70%', gap: '2vh', alignItems: 'center' }}>
                                    <NavLink className={(e) => { return e.isActive ? "red" : "" }} style={{ textDecoration: 'none', color: 'blue' }} to="/" onClick={onClose}>Home</NavLink>
                                    <NavLink className={(e) => { return e.isActive ? "red" : "" }} style={{ textDecoration: 'none', color: 'blue' }} to="/about" onClick={onClose}>About</NavLink>
                                    <NavLink className={(e) => { return e.isActive ? "red" : "" }} style={{ textDecoration: 'none', color: 'blue' }} to="/contact" onClick={onClose}>Contact Us</NavLink>
                                    <button style={{ background: 'blue', border: 'none', padding: '5px 8px', fontSize: '16px', borderRadius: '3px', padding: '3px 7px' }} onClick={onClose}>
                                        {isAuthenticated ? (
                                            <>
                                                <NavLink className={(e) => { return e.isActive ? "red" : "" }} onClick={handleLogout} style={{ textDecoration: 'none', color: 'white' }} to="/">LogOut</NavLink>

                                            </>
                                        ) : (

                                            <NavLink className={(e) => { return e.isActive ? "red" : "" }} style={{ textDecoration: 'none', color: 'white' }} to="/login">Login</NavLink>
                                        )
                                        }
                                    </button><img style={{ width: '40px', height: '40px' }} src="https://media.tenor.com/9Rt9JC45-54AAAAi/nepal-nepali.gif" alt="flag" />
                                </div>
                            </Drawer>
                        </>
                }
            </nav>
            <div>

                <Outlet />
            </div>




        </div>
    )
}
