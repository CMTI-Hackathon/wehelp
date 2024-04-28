// import '../scss/auth/auth.css'
import Header from '../components/Header/Header'
import '/src/assets/scss/chat/chat.css'
import '/src/assets/jquery-3.7.1.min.js'
import React, { useState } from 'react'

export default function chat() {

	return (
		<div className='conteiner'>
			<Header></Header>
			<div className="chatbox">
				<div className='msg-sent'>Message sent</div>
				<div className='msg-received'>Message received</div>
				<div className='msg-received'>Message received</div>
				<div className='msg-received'>Message received</div>
				<div className='msg-sent'>Message sent</div>
				<div className='msg-sent'>Message sent</div>
			</div>
		</div>
	)
}

