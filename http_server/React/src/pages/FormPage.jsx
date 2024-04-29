import { useState, useEffect } from 'react';
import Header from '../components/react/Header'
import '../components/styles/pages/Form/form.css'
import { useNavigate } from 'react-router-dom';

async function CheckUser(id,history){

	const response = await fetch(`/api/getUserById?id=${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(res =>{
		if(!res.ok){
			throw new Error(`HTTP error ${res.status}`);
		}
		return res.json();
	})
	.then(json =>{
		if(json.isHelper == undefined){
			history("/forma")

			return false;
		}
		else{
			history("/home")
		}
	})
	.catch((error) => console.error("Error:",error));

	return true;
}

function getUserId(){
	let cookie = undefined;
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${"user_id"}=`);
	if (parts.length === 2) cookie = parts.pop().split(';').shift();
	return cookie;
}

export default function FormPage(){
	const history = useNavigate();
	const id = getUserId();
	
	let cookie = undefined;
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${"session_id"}=`);
	if (parts.length === 2) cookie = parts.pop().split(';').shift();

	if (cookie === undefined) {
		// history('/auth',{replace:true});
		setTimeout(history,0,"/auth")
	}
	else{
		CheckUser(id,history);
	}

	


    async function sendInfo(senData){
        const response = await fetch('/api/createPost',{
            method:"POST",
            body: JSON.stringify(senData),
            headers:{
                'Content-Typer':'application/json'
            }
        })
        if(!response.ok){
            throw new Error("fail");
        }
		history('/');
    }
    
    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries())
        const senData = {
            userId:getUserId(),
            header:data.header,
            text:data.text,
            type:data.type
        }
        console.log(JSON.stringify(senData))
        sendInfo(senData)
    }
    return(
        <div className="conteiner">
            <Header/>
            <main className='formPage'>
                <div className='formConteiner'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="">
                            <input type="text" className='title' name='header' minLength='9' maxLength='40' required placeholder='Короткий опис проблеми' />
                        </label>
                        <label htmlFor="">
                            <textarea required name="text" className='text' id="" rows="10" maxLength='900' minLength='40' placeholder='Опишіть проблему в загальному'></textarea>
                        </label>
                        <label htmlFor="">
                            <p>Допомога, на яку ви очікуєте</p>
                            <select className='typeOfHelp' name="type" required>
                                <option name='money' value="money">Кошти</option>
                                <option name='care' value="care">Догляд</option>
                                <option name='support' value="support">Підтримка</option>
                            </select>
                        </label>
                        <input type="Submit" className='sendBtn1' value='Опублікувати'/>
                    </form>
                </div>
            </main>
        </div>
    )
}