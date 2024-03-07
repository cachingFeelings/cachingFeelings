import React from 'react'
import './fixedcomponents.css'
import { Link } from "react-router-dom"

const NavBar = () => {

    const content = (
        <div className="navigation-bar">
            <Link to='/try' className='button'>try</Link>
            <Link to='/catch' className='button'>catch</Link>
            <Link to='/finally' className='button'>finally</Link>
            <Link to='/userconfig' className='button'>userconfig</Link>
        </div>
      )
    
      return content; 
}
export default NavBar