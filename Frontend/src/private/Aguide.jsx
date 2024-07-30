import React from 'react'
import modifyBookGuideimg from '/modifyBookGuide.jpg'
import seeRecordsGuideimg from '/seeRecordsGuide.png'
export default function Aguide() {
  return (
    <div style={{minHeight:'100%',overflowY:'scroll',scrollbarWidth:'none',borderRadius:'15px',boxShadow:'0px 0px 16px black'}}>
      {/* <h1 style={{textAlign:'center',color:'red',margin:'2vh 0'}}></h1> */}
      <h1 style={{ textAlign: 'center', width: '100%', margin: '20px 0', position: 'sticky', top: '0', fontSize: '24px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>Hi I am here to guide you !</h1>
      <h3 style={{margin:'5vh 5vw',color:'blue'}}>1) For Modify Books, Add Admin and Add Students section</h3>
      <img style={{width:'90%',height:'60%'}} src={modifyBookGuideimg} alt="" />
      <h3 style={{margin:'5vh 5vw',color:'blue'}}>2) Steps for book circulation</h3>
      <img style={{width:'100%',height:'60%'}} src={seeRecordsGuideimg} alt="" />

    </div>
  )
}
