import imgOfTheProfile from '/imgOfProfile/imgOfProfile.png';
import {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
export default function Article({about}){
    const [name, setName] = useState("")
    const navigate = useNavigate();
    
    const nave = ()=>navigate('/post', {state:{titleText:about.title, text:about.body}})
    
    return(
           <a onClick = {()=>nave()}>
                <div className="article">
                    <div className="aboutProfile">
                        <ul>
                            <li><img alt="imgOfProfile" src={imgOfTheProfile} className="imgOfProfile"/></li>
                            <li><a href="#" className="nameOfProfile">{name}</a></li>
                            <li><span className='separator'>•</span></li>
                            <li><a href="#" className='dateOfPublication'>10.07.2023</a></li>
                        </ul>
                        <a href="" className='writeTo'>Написати</a>
                    </div>
                    <div className="titleOfArticle">
                        <p>{about.title}</p>
                    </div>
            
                    <div className="textOfArticle">
                        <p>{about.body}</p>
                    </div>          
                </div>
                <hr/>
            </a>
        
    )
}