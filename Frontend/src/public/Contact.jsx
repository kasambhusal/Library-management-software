import Footer from './Footer'
import React, { useEffect } from 'react'

export default function Contact({ setIsAuthenticated }) {
  useEffect(() => {
    setIsAuthenticated(false)
    sessionStorage.setItem('Token', null)

  }, [])
  return (
    <>
      <div>Contact</div>
      <Footer />
    </>
  )
}
