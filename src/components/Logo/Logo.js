import React from 'react';
import Tilt from 'react-tilt';
import logo from './logo.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='mh4 mt0'>
      <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 50, width: 50 }} >
        <div className="Tilt-inner">
          <img alt='logo' src={logo}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;