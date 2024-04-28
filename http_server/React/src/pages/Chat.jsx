// import '../scss/auth/auth.css'
import Header from '../components/react/Header'
import '../components/styles/pages/Chat/chat.css'
import '../jquery-3.7.1.min.js'
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'

const sessionId = "1"; // temporary


async function sendMessage(){
	// await checkMessage();
	// console.log( fetchUserById("2"));
}



async function checkMessage(){
	// console.log("hello");
	const messages = await fetchMessages();
	const msges = document.getElementById('messages');
	if(msges == null) {
		return -1;
	}
	for(let i = 0;i < messages.length; i++){
		const div = document.createElement('div');
		if(messages[i].contactid != sessionId){
			div.classList.add("msg-sent");
		}
		else{
			div.classList.add("msg-received");
		}
		div.setAttribute("name", `${messages[i].sessionid}_${messages[i].contactid}_${messages[i].time}`);

		div.innerText = messages[i].message;
		if(document.getElementsByName(`${messages[i].sessionid}_${messages[i].contactid}_${messages[i].time}`).length == 0){
			msges.appendChild(div);
		}
	}
}





async function fetchMessages(){
	const messagesUrl = "http://localhost:3000/messages"
	const response = await fetch(messagesUrl);
	return response.json();
}

async function fetchUsers(){
	const userUrl = "http://localhost:3000/users"; // databases for test purposes 
	const response = await fetch(userUrl);
	return response.json();
}

async function fetchUserById(id){
	const users = await fetchUsers();
	const contacts = document.getElementById("contact");
	console.log(contacts);
	for(let i = 0;i < users.length; i++){
		if(users[i].id == id){
			const div = document.createElement("div");
			div.innerText = users[i].name;
			contacts.appendChild(div);
		}
	}
	return 0;
}

function checkText(e){
	e.target.style.height = 'auto';
	e.target.style.height = `${e.target.scrollHeight}px`
}

export default function chat() {
	const { id } = useParams(); 
	
	return (
		<div className='chatContainer'>
			<Header></Header>
			<div className="chatbox">
				{/* <div className='contactsInfo' id='contact' onLoad={() => fetchUserById()}>

				</div> */}
				

				<div id='messages'>	
					{/* <div className='msg-sent'>{id}</div> */}
				</div>
				<p hidden>{setInterval(checkMessage, 500)}</p>
				<div className='msgboxContainer'>
					{/* <input type="text" id='message' onKeyPress={checkText} className='msgbox' placeholder='Написати повідомлення...' /> */}
					<textarea rows="1" id='message' className='msgbox' placeholder='Написати повідомлення...' onChange={checkText}></textarea>
					{/* <div contentEditable className='msgbox'></div> */}
					<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512" className='sendBtn' onClick={sendMessage}><path d="M476.59,227.05l-.16-.07L49.35,49.84A23.56,23.56,0,0,0,27.14,52,24.65,24.65,0,0,0,16,72.59V185.88a24,24,0,0,0,19.52,23.57l232.93,43.07a4,4,0,0,1,0,7.86L35.53,303.45A24,24,0,0,0,16,327V440.31A23.57,23.57,0,0,0,26.59,460a23.94,23.94,0,0,0,13.22,4,24.55,24.55,0,0,0,9.52-1.93L476.4,285.94l.19-.09a32,32,0,0,0,0-58.8Z"/></svg>
				</div>
			</div>
		</div>
	)
}


