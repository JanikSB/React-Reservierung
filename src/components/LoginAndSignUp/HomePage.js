import React, {useEffect, useRef, useState} from "react";
import LoginField from "./SignInField";
import SignUpField from "./SignUpField";
import axios from 'axios';
import "./LoginSignUp.css"

function HomePage({Anmeldung}){

  //dbUser = Alle Logindaten
  //Datenbankdaten aus localhost:3001/getUsers werden ausgelesen und im state dbUser gespeichert
  const [dbUser, setDbUser] = useState([]);

  const readUsers = () => {
    const url = '/getUsers';
		axios.get(url)
			.then(res =>{
				console.log(res);
				setDbUser(res.data);
			})
			.catch(err => {
				console.log("FETCH FEHLERRR: "+err);
			});
  }

	useEffect(()=> {
		readUsers()
	},[]);

  



//Login wird aufgerufen, durch SignInField onSubmit Funktion des Anmeldeknopfes (Eigabedaten der Anmeldung werden uebertragen auf Login())
  const [user, setUser] = useState({
    name:'',
    passwort:''
  });
  const Login = (details) => {
    console.log(details);
    setUser({name: details.name, passwort: details.password}); //Logindaten von SignInField werden auf state 'user' uebertragen
  }

  //Anmeldedaten aus state "user" pruefen mit Datenbankinfos im State "dbUser"
    //in useEffect() verpackt, damit erst dann aufgerufen wird, wenn state "user" sich veraendert
  useEffect(() => {
    console.log("OK!!: " + user);
    dbUser.forEach(dbUser => {
			console.log('user: '+dbUser.userName +' '+dbUser.passwort);
			if(dbUser.userName == user.name && dbUser.passwort == user.passwort){
				console.log("Erfolgreiche anmeldung");
        Anmeldung(user.name, user.passwort);  //Anmeldestatus von App.js wird auf true gesetzt (Funktion Anmeldung() kommt aus App.js)
			}
		});
  },[user])


//Registrierungsfunktion fuer 'SignUp.js' wird erstellt und bei Registrierung in newUser gespeichert
  const [newUser, setNewUser] = useState({
    name: '',
    password: '',
    email: ''
  })
  const SignUp = (details) => {
    console.log(details);
    setNewUser({name: details.name, password: details.password, email: details.email})
  }

  const newUserInDB = (userName, email, passwort) => {
    (async () => {
      try {
          await fetch('/addUser', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  userName: userName, email: email, password: passwort
              })
          })
              .then(readUsers())
              // .then(alert(`Reservation of Room ${roomNumber} has been reserved successfully from ${dateTimeFrom} until ${dateTimeTo}.`))
      }
      catch (err) {
          console.log(err);
      }
   })()
  }

  const initialRender = useRef(true);
  useEffect(() => {

    if(initialRender.current){
      initialRender.current = false;
      console.log('initRender zu false');
    } else{
      let nameExists = false;
      let emailExists = false;

      console.log('OK!: '+ JSON.stringify(newUser));
      dbUser.forEach(dbUser => {
        console.log('user: '+ dbUser.userName + ' ' + dbUser.passwort + ' ' + dbUser.email);
        if(dbUser.userName == newUser.name){
          console.log('USERNAME gibt es BEREITS');
          nameExists = true;
        }
        if(dbUser.email == newUser.email){
          console.log('EMAIL gibt es BEREITS');
          emailExists = true;
        }
      })

      if(!nameExists && !emailExists){
        console.log('KLAPPT222');
        newUserInDB(newUser.name, newUser.email, newUser.password);
        Anmeldung(newUser.name, newUser.password);
      }

    }
  }, [newUser])




  //HomePage sliden 
  useEffect(()=>{
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  },[]);




  
  return(
    <>
    <div style={{boxSizing:"border-box", background:'white', display:"flex", justifyContent:'center', alignItems:"center", flexDirection:'column', fontFamily:'Montserrat', height:'100vh', margin:'-20px 0 50px'}}>
      <div className="container" id="container">
        <SignUpField SignUp={SignUp}/>
        <LoginField Login={Login}/>
      </div>
    </div>
    </>
  );
}

export default HomePage;