import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./NavBar/Navbar";
import BookingSite from "./BookingSite/BookingSite.js";
import Profile from "./Profile/Profile";
import Dashboard from './Dashboard/Dashboard';

function LoggedIn({loggedUser}) {

  


  return (
    <>
    <Router>
          <Navbar/>

          <Routes>
            <Route path='/' element={<Dashboard user={loggedUser}/>} exact/>

            <Route path='/booking' element={<BookingSite user={loggedUser}/>} exact/>

            <Route path='/profile' element={<Profile user={loggedUser}/>} exact/> 
          </Routes>
    </Router>
    </>
  )
}

export default LoggedIn
