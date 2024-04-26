import '../scss/auth/auth.css'
import '/src/assets/jquery-3.7.1.min.js'
import React, { useState, useEffect } from 'react'

async function loginSend(e) {
	e.preventDefault();
	const email = document.getElementById("email");
	const password = document.getElementById("password");
	const response = await fetch('/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email, password
		})
	})
	// return response.json();
	return false;
}

function loginForm() {
	return (
		<div className='authBody'>
			<form onSubmit={loginSend} className='auth-form' id='loginform'>
				<h2>Login into your account</h2>

				{/* Change class name later */}
				<input type="text" id='email' placeholder="Email" className="email" required />
				<input type="password" id='password' placeholder="Password" className="password" required />
				<button type="submit" id='submit'>Login</button>
			</form>
		</div>
	);
}



async function registerSend(e) {
	e.preventDefault();

	const password = document.getElementById("password");
	if (!(password === document.getElementById("cPassword"))) { return false };

	const username = document.getElementById("name");

	// add check if email is taken
	const email = document.getElementById("email");

	const role = document.getElementById("helper").checked;


	const response = await fetch('/api/registerUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username, email, password, role
		})
	})
	// return response.json();
	return true;
}

function registerForm() {

	return (
		<div className='authBody'>

			<form onSubmit={registerSend} className='auth-form' id='registerform'>
				<h2>Register your account</h2>
				<input type="text" id='name' placeholder="Name" className="name" required />
				<input type="email" id='email' placeholder="Email" className="email" required />
				<input type="password" id='password' placeholder="Password" className="password"
					pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" title='Password must consist of least 8 characters and contain 
			 at least one uppercase letter, one lowercase letter and a number' required />
				<input type="password" id='cPassword' placeholder="Confirm Password" className="password"
					pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required />

				<div>
					<span> Register as: </span>

					<input type="radio" id="user" name="type" value="User" checked />
					<label for="user">User</label>

					<input type="radio" id="helper" name="type" value="Helper" />
					<label for="helper">Helper</label>
				</div>


				<button type="submit" id='submit'>Register</button>
			</form>

		</div>
	);
}

export default function Auth() {
	const [isLogin, setForm] = useState(true);
	useEffect(() => {
		document.title = "Authorization";
	}, []);

	function changeForm() {
		setForm(current => !current)
		let change = document.getElementById('change');
		!isLogin ? change.innerText = "Already have an account? Login" : change.innerText = "First time here? Register";

	}

	return (

		<div className='body'>

			<div className='container'>
				<div className='logoContainer'>
					<img src="" alt="LOGO" className='logo' />
					<h3>CompanyName</h3>
				</div>
				<div className='authContainer'>
					{!isLogin ? loginForm() : registerForm()}
					<p onClick={changeForm} id='change'>Already have an account? Login</p>
				</div>
			</div>


		</div>

	)
}
// import { useState } from 'react'
// import './App.css'

