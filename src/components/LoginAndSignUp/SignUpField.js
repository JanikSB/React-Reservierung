import React, { useState } from "react";

function SignUpField ({SignUp}){

	//Infos die bei der Registrierung eingegeben werden
	const [signUpInfo, setSignUpInfo] = useState({
		name: '',
		password: '',
		email: ''
	});


	//User Name von Inputfeld zuweisen
	const handleName = ({target}) => {
		setSignUpInfo({...signUpInfo, name: target.value});
		// console.log(userInf);
	}

	//User Passwort von Inputfeld zuweisen
	const handlePassword = ({target}) => {
		setSignUpInfo({...signUpInfo, password: target.value});
		// console.log(userInf);
	}

	//User Email von Inputfeld zuweisen
	const handleEmail = ({target}) => {
		setSignUpInfo({...signUpInfo, email: target.value});
		// console.log(userInf);
	}


	const submitHandler = e =>{
		e.preventDefault();

		console.log('Registrierungsdaten: '+ JSON.stringify(signUpInfo));
		SignUp(signUpInfo)
	}


  return(
    <>
    	<div className="form-container sign-up-container">
		<form onSubmit={submitHandler}>
			<h1>Konto erstellen</h1>

      <br></br>
			<input type="text" placeholder="Benutzername" onChange={handleName} value={signUpInfo.name}/>
			<input type="email" placeholder="Email" onChange={handleEmail} value={signUpInfo.email}/>
			<input type="password" placeholder="Passwort" onChange={handlePassword} value={signUpInfo.password}/>

			<button type="submit">Registrieren</button>
		</form>
	</div>
    </>
  );
}

export default SignUpField;