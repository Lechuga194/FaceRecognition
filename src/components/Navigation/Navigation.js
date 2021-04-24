import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
  if(isSignedIn){
    return(
      <nav style={{display: 'flex', justifyContent:'flex-end'}}>
          <p 
          className="f3 link dim white underline pointer mh3 ph3"
          onClick={() => onRouteChange('signin')}>
          Sign Out</p>
      </nav>
      );
  }else{
    return(
      <nav style={{display: 'flex', justifyContent:'flex-end'}}>
          <p 
          className="f3 link dim white underline pointer mh3 ph3"
          onClick={() => onRouteChange('signin')}>
          Sign In</p>

          <p 
          className="f3 link dim white underline pointer mh3 ph3"
          onClick={() => onRouteChange('register')}>
          Register</p>
      </nav>
    );
  }
}

export default Navigation;