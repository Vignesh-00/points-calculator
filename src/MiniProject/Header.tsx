// @ts-nocheck
import React from 'react'
import AEC from './img/AEC.jpg'
import TNAU from './img/TNAU.jpg'
import PSIT from './img/PSIT.png'


export default function Header() {

  const imageStyle = {
    width: '4rem',
    height: '4rem'
  }

  return (
    <nav className="navbar navbar-expand bg-light navbar-light sticky-top py-0">
      <div className="navbar-nav align-items-center mr-auto">
        <img className="rounded-circle me-lg-2" src={TNAU} alt="" style={imageStyle} />
      </div>
      <div className="navbar-nav align-items-center m-auto">
        <img className="rounded-circle me-lg-2" src={AEC} alt="" style={imageStyle} />
      </div>
      <div className="navbar-nav align-items-center ml-auto">
        <img className="rounded-circle me-lg-2" src={PSIT} alt="" style={imageStyle} />
      </div>

    </nav>
  )
}
