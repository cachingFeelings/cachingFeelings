import React from 'react'
import './fixedcomponents.css'
import { Link } from 'react-router-dom'

const Header = () => {

  const handleSignOut = () => {
    localStorage.removeItem('token');
  };

    const content = (
        <div className='above-navigation-bar'>
          <p className='title'>Caching Feelings</p>
          <div className='button-group'>
            <Link to='/communityDiscovery'>Community</Link>
            <Link to='/' onClick={handleSignOut}>Sign Out</Link>
          </div>
        </div>
      )
    
      return content; 
}
export default Header