import '../components/styles/pages/Auth/auth.css'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"



async function loginSend(e) {
	e.preventDefault();
	const history = useNavigate();
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const response = await fetch('/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email, password
		})
	})
	.then(res =>{
		if(!res.ok){
			throw new Error(`HTTP error ${res.status}`);
		}
		return res.json();
	})
	.catch((error) => console.error("Error:",error));

	console.log(response.success)
	if(response.success === true){
		useEffect(()=>{
			localStorage.setItem('userId',response.id)
		});
		history('/auth');
	}else{
		return false;
	}
}

function loginForm() {
	return (
		<div className='authBody'>
			<form onSubmit={loginSend} className='auth-form' id='loginform'>
				<h2>Увійдіть у свій аккаунт</h2>

				<input type="text" id='email' placeholder="Електронна пошта"  required />
				<input type="password" id='password' placeholder="Пароль"  required />
				<button type="submit" id='submit'>Вхід</button>
			</form>
		</div>
	);
}

async function registerSend(e) {
	e.preventDefault();


	const password = document.getElementById("password").value;
	if (!(password === document.getElementById("cPassword").value)) { return false };

	const username = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const role = document.querySelector('input[name="type"]:checked').value == "Helper";


	const response = await fetch('/api/registerUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username, email, password, role
		})
	})
	.then(res =>{
		if(!res.ok){
			throw new Error(`HTTP error ${res.status}`);
		}
		return res.json();
	})
	.catch((error) => console.error("Error:",error));

	
	if(response.success === true){
		useEffect(()=>{
			localStorage.setItem('userId',response.id)
		});
		history('/auth');
		// window.location.pathname = '/';
	}else{
		return false;
	}
}

function registerForm() {

	return (
		<div className='authBody'>
			<form onSubmit={registerSend} className='auth-form' id='registerform'>
				<h2>Зареєструйте свій аккаунт</h2>
				<input type="text" id='name' placeholder="Ім'я" required />
				<input type="email" id='email' placeholder="Електронна пошта"  required />
				<input type="password" id='password' placeholder="Пароль" 
					pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" title='Password must consist of least 8 characters and contain 
			 at least one uppercase letter, one lowercase letter and a number' required />
				<input type="password" id='cPassword' placeholder="Підтвердження паролю" 
					pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" required />

				<div id='choice'>
					<span> Зареєструватися як: </span>

					<div>
						<input type="radio" id="user" name="type" value="User" checked />
						<label for="user">Користувач</label>
					</div>
					<div>
						<input type="radio" id="helper" name="type" value="Helper" />
						<label for="helper">Помічник</label>
					</div>
				</div>


				<button type="submit" id='submit'>Реєстрація</button>
				<li><Link to={"/chats"}>Go to chats temporary</Link></li> {/* tmp */}
			</form>

		</div>
	);
}

export default function Auth() {
	const history = useNavigate();
	
	useEffect(()=>{
		let cookie = undefined;
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${"session_id"}=`);
		if (parts.length === 2) cookie = parts.pop().split(';').shift();
		console.log(cookie)
		if(cookie !== undefined){
			history('/');
		}

	})

	const [isLogin, setForm] = useState(true);
	useEffect(() => {
		document.title = "Authorization";
	}, []);

	function changeForm() {
		setForm(current => !current)
		let change = document.getElementById('change');
		!isLogin ? change.innerText = "Уже зареєстровані? Увійдіть" : change.innerText = "Перший раз тут? Зареєструватися";

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
					<p onClick={changeForm} id='change'>Уже зареєстровані? Увійдіть</p>
				</div>
			</div>


		</div>

	)
}
// import { useState } from 'react'
// import './App.css'

