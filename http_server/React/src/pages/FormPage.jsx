import { useState } from 'react';
import Header from '../components/react/Header'
import '../components/styles/pages/Form/form.css'

// message post{
//     string userId = 1;
//     string header = 2;
//     string text = 3;
//     string type = 4;
// }

async function postCreate(e){
    e.preventDefault()
    const [userId] = useState(() => {
        const storageId = localStorage.getItem('userId')
        return storageId
    })
    const header = document.getElementById("header").value;

	const text = document.getElementById("description").value;
    const type = document.getElementById("types").value;


	const response = await fetch('/api/createPost', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			userId, header, text, type
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
		window.location.pathname = '/';
	}else{
		return false;
	}
}

export default function FormPage(){
    return(
        <div className="conteiner">
            <Header/>
            <main className='formPage'>
                <div className='formConteiner'>
                    <form onSubmit={postCreate}>
                        <label htmlFor="">
                            <input type="text" className='title' id="header" minLength='9' maxLength='40' required placeholder='Короткий опис проблеми' />
                        </label>
                        <label htmlFor="">
                            <textarea required name="" className='text' id="desc" rows="10" maxLength='900' minLength='40' placeholder='Опишіть проблему в загальному'></textarea>
                        </label>
                        <label htmlFor="">
                            <p>Допомога, на яку ви очікуєте</p>
                            <select className='typeOfHelp' name="" id="types" required>
                                <option value="Cost">Кошти</option>
                                <option value="Care">Догляд</option>
                                <option value="Support">Підтримка</option>
                            </select>
                        </label>
                        <input type="Submit" className='sendBtn1' value='Опубліувати'/>
                    </form>
                </div>
            </main>
        </div>
    )
}