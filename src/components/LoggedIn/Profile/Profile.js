import React from 'react'


function Profile({user}) {


  return (
    <div>

      <h1>Benutzername: {user.name}</h1> 
      <a style={{cursor:'pointer', color:'blue'}}>aendern</a>
      <h1>Passwort: {user.passwort}</h1>
      <a style={{cursor:'pointer', color:'blue'}}>aendern</a>
    </div>
  )
}

export default Profile
