import React, {useEffect, useState} from "react";


function LoginField({Login}) {

	//userInf = name und passwort die bei der Anmeldung angegeben werden
	const [userInf, setUserInf] = useState({
		name: '',
		password: ''
	});

	//User Name von Inputfeld zuweisen
	const handleName = ({target}) => {
		setUserInf({...userInf, name: target.value});
		// console.log(userInf);
	}

	//User Passwort von Inputfeld zuweisen
	const handlePassword = ({target}) => {
		setUserInf({...userInf, password: target.value});
		// console.log(userInf);
	}


//User Info an HomePage weitergeben
	const submitHandler = e => {
		e.preventDefault();

		//Login = Props von HomePage eingefuegt
		console.log('Anmeldungsdaten: '+userInf);
		Login(userInf);
	}

//alte funktionen
	// const [dbData, setDbData] = useState([]);

	// useEffect(()=> {
	// 	const url = '/getUsers';
	// 	axios.get(url)
	// 		.then(res =>{
	// 			console.log(res);
	// 			setDbData(res.data);
	// 		})
	// 		.catch(err => {
	// 			console.log("FETCH FEHLERRR: "+err);
	// 		});
	// },[]);


	// const [benutzername, setBenutzername] = useState('');
	// const handleName = ({target}) => {
	// 	const userName = target.value;
	// 	setBenutzername(userName);
	// }



	// const [passwort, setPasswort] = useState('');
	// const handlePassword = ({target}) => {
	// 	const password = target.value;
	// 	setPasswort(password);
	// }

	

	// const handleSubmit = (e) => {
	// 	e.preventDefault();

	// 	dbData.forEach(user => {
	// 		console.log('user: '+user.userName +' '+user.passwort);
	// 		if(user.userName == benutzername && user.passwort == passwort){
	// 			console.log("Erfolgreiche anmeldung");
	// 		}
	// 	});
	// }

	

  return(
    <>
    <div className="form-container sign-in-container">
		<form onSubmit={submitHandler}  >
		{/* ALT: <form action="#" onSubmit={handleSubmit}  > */}
			<h1>Anmeldung</h1>
			<br></br>
			{/* ALT: <input type="text" placeholder="Benutzername" onChange={handleName}/>
			<input type="password" placeholder="Passwort" onChange={handlePassword}/> */}
			<input type="text" placeholder="Benutzername" onChange={handleName} value={userInf.name}/>
			<input type="password" placeholder="Passwort" onChange={handlePassword} value={userInf.password}/>

			<br></br>
			<button type="submit">Anmelden</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				<h1>Willkommen!</h1>
				<p>Um dich anzumelden gib deine Login Daten hier ein</p>
				<button className="ghost" id="signIn">Anmelden</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1>Hallo!</h1>
				<p>Gib deine Informationen ein und registriere dich hier</p>
				<button className="ghost" id="signUp">Registrieren</button>
			</div>
		</div>
	</div>
  </>
  );
}

export default LoginField;