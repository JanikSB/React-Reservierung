import React, {useState, useEffect} from 'react';
import HomePage from './components/LoginAndSignUp/HomePage';
import LoggedIn from './components/LoggedIn/LoggedIn';
import './App.css'

function App () {
  const [user, setUser] = useState({
    name:'',
    passwort:''
  });

  


  const [angemeldet, setAngemeldet] = useState(false);
  const angemeldetStatus = (userName, passwort) => {
    setAngemeldet(true);

    setUser({
      name: userName,
      passwort: passwort
    })



    
  }


  return (
    <>
    <div className="App">
      {(angemeldet) ? <LoggedIn loggedUser={user}/> : <HomePage Anmeldung={angemeldetStatus}/>} 
      
    </div>
    </>
  );
  
}

export default App;