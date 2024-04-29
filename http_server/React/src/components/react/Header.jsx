import {useState} from 'react'
import helmet from '/imgOfSite/helmet.png'
import {Link} from "react-router-dom";
export default function Header(){
    const [arg, func]= useState(false);
    const [isBurgClick, chBurgState] = useState(false);
    function ChangeOverflow(){
        !isBurgClick?document.body.style.overflow = "hidden":document.body.style.overflow = "visible";
    }
    let isLogin = false;
    return(
        <header className={isBurgClick?'active':null}>
            <div className="headerConteiner">
                <div>

                </div>
                <div className='search'>
                    <svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                        viewBox="0 0 488.4 488.4" xmlSpace="preserve" className='searchIcon'>
                    <g>
                        <g>
                            <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
                                s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
                                S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
                                S381.9,104.65,381.9,203.25z"/>
                        </g>
                    </g>
                    </svg>
                    <input type="text" className='searchInp' placeholder='Search'/>
                </div>
                <div className='burgerMenu'>
                    <div className={isBurgClick?'burger active':'burger'} onClick = {()=>{
                        chBurgState(current=>!current);
                        ChangeOverflow()
                        }}>
                        <span></span>
                    </div>
                    <nav className={isBurgClick?'navigation active':'navigation'}>
                        <ul>
                            <li onClick={document.body.style.overflow = "visible"}><Link to="/">Дім</Link></li>
                            <li onClick={document.body.style.overflow = "visible"}><Link to="/chats">Чати</Link></li>
                            <li onClick={document.body.style.overflow = "visible"}><Link to="/forma">Допомоги!</Link></li>
                        
                            <li><div className='account' >{isLogin?
                            
                                <img src={helmet} alt="profile" className='imgOfYourProfile' />
                            :
                            <>
                                <Link className='log_in' to='/auth'>Увійти</Link>
                                <Link className='sign_in' to='/auth'>Зереєструватись</Link>
                            </>
                            }
                            </div></li>
                        </ul>
                    </nav>
                </div>
                
            </div>
        </header>
    )
}