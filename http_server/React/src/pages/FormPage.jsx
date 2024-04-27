import Header from '../components/react/Header'
import '../components/styles/pages/Form/form.css'
export default function FormPage(){
    return(
        <div className="conteiner">
            <Header/>
            <main className='formPage'>
                <div className='formConteiner'>
                    <form action="">
                        <label htmlFor="">
                            <input type="text" className='title' minLength='9' maxLength='40' required placeholder='Короткий опис проблеми' />
                        </label>
                        <label htmlFor="">
                            <textarea required name="" className='text' id="" rows="10" maxLength='900' minLength='40' placeholder='Опишіть проблему в загальному'></textarea>
                        </label>
                        <label htmlFor="">
                            <p>Допопмога, на яку ви очікуєте</p>
                            <select className='typeOfHelp' name="" id="" required>
                                <option value="">Кошти</option>
                                <option value="">Догляд</option>
                                <option value="">Підтримка</option>
                            </select>
                        </label>
                        <input type="Submit" className='sendBtn' value='Опубліувати'/>
                    </form>
                </div>
            </main>
        </div>
    )
}