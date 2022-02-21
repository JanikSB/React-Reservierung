import React from "react";

function SignUpField (){

  return(
    <>
    	<div className="form-container sign-up-container">
		<form action="#">
			<h1>Konto erstellen</h1>

      <br></br>
			<input type="text" placeholder="Benutzername" />
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Passwort" />
			<button>Registrieren</button>
		</form>
	</div>
    </>
  );
}

export default SignUpField;