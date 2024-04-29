import Header from '../components/react/Header'
import '../components/styles/pages/Form/form.css'
import {useState} from 'react';
export default function FormPage(){
    async function sendInfo(senData){
        const response = await fetch('/api/createPost',{
            method:"POST",
            body: JSON.stringify(senData),
            headers:{
                'Content-Typer':'application/json'
            }
        })
        console.log(response);
        if(!response.ok){
            throw new Error("fail");
        }
    }
    
    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries())
        const senData = {
            userId:"1",
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
                            <p>Допопмога, на яку ви очікуєте</p>
                            <select className='typeOfHelp' name="type" required>
                                <option name='money' value="money">Кошти</option>
                                <option name='care' value="care">Догляд</option>
                                <option name='support' value="support">Підтримка</option>
                            </select>
                        </label>
                        <input type="Submit" className='sendBtn1' value='Опубліувати'/>
                    </form>
                </div>
            </main>
        </div>
    )
}