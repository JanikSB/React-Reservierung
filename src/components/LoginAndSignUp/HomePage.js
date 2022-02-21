import React, {useEffect, useState} from "react";
import LoginField from "./SignInField";
import SignUpField from "./SignUpField";
import axios from 'axios';
import "./LoginSignUp.css"

function HomePage({Anmeldung}){

  //dbUser = Alle Logindaten
  //Datenbankdaten aus localhost:3001/getUsers werden ausgelesen und im state dbUser gespeichert
  const [dbUser, setDbUser] = useState([]);
	useEffect(()=> {
		const url = '/getUsers';
		axios.get(url)
			.then(res =>{
				console.log(res);
				setDbUser(res.data);
			})
			.catch(err => {
				console.log("FETCH FEHLERRR: "+err);
			});
	},[]);

  



//Login wird aufgerufen, durch SignInField onSubmit Funktion des Anmeldeknopfes (Eigabedaten der Anmeldung werden uebertragen auf Login())
  const [user, setUser] = useState({
    name:'',
    passwort:''
  });
  const Login = (details) => {
    console.log(details);
    setUser({name: details.name, passwort: details.passwort}); //Logindaten von SignInField werden auf state 'user' uebertragen
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
        <SignUpField/>
        <LoginField Login={Login}/>
      </div>
    </div>
    </>
  );
}

export default HomePage;