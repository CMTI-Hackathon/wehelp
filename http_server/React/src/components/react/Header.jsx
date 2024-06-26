import { useEffect, useState } from 'react'
import helmet from '/imgOfSite/helmet.png'
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
function logout(){
    Cookies.remove("session_id");
    Cookies.remove("user_id");
    location.reload();
}

export default function Header() {

    const history = useNavigate();
    
    let id = undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${"user_id"}=`);
    if (parts.length === 2) id = parts.pop().split(';').shift();


    const [arg, func] = useState(false);
    const [isBurgClick, chBurgState] = useState(false);
    function ChangeOverflow() {
        !isBurgClick ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible";
    }
    let cookie = undefined;
    useEffect(() => {

        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${"session_id"}=`);
        if (parts.length === 2) cookie = parts.pop().split(';').shift();
        if (cookie === undefined) {
            history('/auth',{replace:true});
            // setTimeout(history,0,'/auth'
        }
    })
    return (
        <header className={isBurgClick ? 'active' : null} >
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
                    <input type="text" className='searchInp' placeholder='Search' />
                </div>
                <div className='burgerMenu'>
                    <div className={isBurgClick ? 'burger active' : 'burger'} onClick={() => {
                        chBurgState(current => !current);
                        ChangeOverflow()
                    }}>
                        <span></span>
                    </div>
                    <nav className={isBurgClick ? 'navigation active' : 'navigation'}>
                        <ul>
                            {/* <li><Link to="/chats">Чати</Link></li> */}
                            {/* <li><Link to="/" replace:true >Дім</Link></li> */}
                            <li><a href=''>Дім</a></li>
                            <li><Link to="/forma">Допомоги!</Link></li>
                            <li><Link onClick={logout}>Вийти</Link></li>
                            <li><div className='account' >{cookie === undefined ?

                                <img src={helmet} alt="profile" className='imgOfYourProfile' />
                                :
                                <>
                                    <Link className='log_in' to='/auth'>Авторизуватися</Link>
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