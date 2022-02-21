import React, { useEffect, useState } from 'react';
import {useLocation, NavLink} from 'react-router-dom';
import './NavBar.css';
import logo from './logo.png';

function Navbar() {

  // const [path, setPath] = useState('/');

  const location = useLocation();
  console.log(location.pathname);
  // setPath(location);

  // useEffect(() => {

  // }, [location]);
  
  return (
    <nav className='navbar'>
      <img src={logo} id='logo' alt='T Systems'/>

      <ul className='nav-links'>
        <NavLink exact='true' to='/' className= {({isActive}) => 'dashboard' + (isActive ? ' active' : '')}
        style={({ isActive }) => ({
          color: isActive ? '#353a42' : '#545e6f',
          fontWeight: isActive ? 'bolder' : 'bold'
        })}

        // id={isActive => 'nav' + (isActive ? 'Active' : '')}
        >Dashboard</NavLink>

        <NavLink exact='true' to='/booking' className={({isActive}) => 'booking' + (isActive ? ' active' : '')}
        style={({ isActive }) => ({
          color: isActive ? '#353a42' : '#545e6f',
          fontWeight: isActive ? 'bolder' : 'bold'
        })}
        >Booking</NavLink>


        <NavLink exact='true' to='/profile' className={({isActive}) => 'profile' + (isActive ? ' active' : '')}
        style={({ isActive }) => ({
          color: isActive ? '#353a42' : '#545e6f',
          fontWeight: isActive ? 'bolder' : 'bold'
        })}
        >Profile</NavLink>
      </ul>

      <a className='logout' href=''>Logout</a>
    </nav>
  )
}

export default Navbar
