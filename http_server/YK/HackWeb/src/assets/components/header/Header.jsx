import {useState} from 'react'
import helmet from './helmet.png'   
import '../../scss/header/header.css'
export default function Header(){
    const [arg, func]= useState(false);
    let isLogin = false;
    const stylediv = {
        
        
            backgroundColor: "lightblue"
        

    };
   
    
    return(
        <>
        <header>
            <div className="headerCont wrapper">
                <div className='logo'>
                <svg className='logoPng' width="800px" height="800px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet"><path fill="#464F25" d="M33 15c-.987-7.586-4.602-14-15-14S3.987 7.414 3 15c-.152 1.169-2 2-2 6c0 2 1.366 3.564 3 4c3.105.829 3-1 14-1s10.895 1.829 14 1c1.634-.436 3-2 3-4c0-4-1.848-4.831-2-6z"></path><path fill="#383A18" d="M18 15.068C7.602 15.068 2.001 17 2.001 21c0 2 .365-.176 1.999.261c3.105.829 3-2.317 14-2.317s10.895 3.146 14 2.317c1.634-.437 1.999 1.739 1.999-.261c0-4-5.601-5.932-15.999-5.932z"></path><path fill="#C1694F" d="M18 33.966C8.733 33.966 4.034 29.94 4.034 22c0-7.94 4.699-11.966 13.966-11.966c9.268 0 13.966 4.026 13.966 11.966c0 7.94-4.698 11.966-13.966 11.966zm0-22C9.79 11.966 5.966 15.154 5.966 22S9.79 32.034 18 32.034S30.034 28.846 30.034 22S26.21 11.966 18 11.966z"></path><path fill="#662113" d="M24 32c0 1.657-2.686 3-6 3s-6-1.343-6-3s2.686-1 6-1s6-.657 6 1z"></path><path fill="#717735" d="M33 15c-.987-7.586-4.602-14-15-14S3.987 7.414 3 15c-.152 1.169-2 2-2 6c0 2 1.366 3.564 3 4c0-4 0-8 14-8s14 4 14 8c1.634-.436 3-2 3-4c0-4-1.848-4.831-2-6z"></path><path fill="#A3A364" d="M18 13c-7 0-17 1-17 8c0 2 1.366 3.564 3 4c0-4 0-8 14-8s14 4 14 8c1.634-.436 3-2 3-4c0-7-11-8-17-8z"></path><path fill="#677032" d="M18 16C7.602 16 1 17 1 21c0 2 1.366 3.564 3 4c0-4 0-8 14-8s14 4 14 8c1.634-.436 3-2 3-4c0-4-6.602-5-17-5z"></path></svg>
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
                
                <nav className='navigation'>
                    <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="">About</a></li>
                      
                        <li><div className='account' >{isLogin?
                        
                        <img src={helmet} alt="profile" className='imgOfYourProfile' />
                        :
                        <>
                        <button className='log_in'>Log in</button>
                        <button className='sign_in'>Sign in</button></>}
                        
                        </div></li>
                    </ul>
                </nav>
                
               
                
            </div>
        </header>
        </>
    )
}