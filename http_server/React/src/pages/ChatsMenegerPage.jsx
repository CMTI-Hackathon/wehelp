import ChatLink from "../components/react/ChatLink";
import '../components/styles/pages/Chats/chats.css';
import { Link } from "react-router-dom";
import Header from "../components/react/Header";
export default function ChatsMeneger(){
    return(
        <div className="conteiner">
            <Header></Header>
            <main className="chatsPage">
                <div className='manageChats'>
                    <ul>
                        <li>
                            <svg className='addChat' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 viewBox="0 0 92 92" enable-background="new 0 0 92 92" xml:space="preserve">
                            <path id="XMLID_933_" d="M72.5,46.5c0,2.5-2,4.5-4.5,4.5H50v17c0,2.5-2,4.5-4.5,4.5S41,70.5,41,68V51H24c-2.5,0-4.5-2-4.5-4.5
                                s2-4.5,4.5-4.5h17V24c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5v18h18C70.5,42,72.5,44,72.5,46.5z"/>
                            </svg>
                        </li>
                        <li>
                            <svg className="deleteChat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 1.75V3h5.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75Zm-6.5 0V3h5V1.75a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25ZM4.997 6.178a.75.75 0 1 0-1.493.144L4.916 20.92a1.75 1.75 0 0 0 1.742 1.58h10.684a1.75 1.75 0 0 0 1.742-1.581l1.413-14.597a.75.75 0 0 0-1.494-.144l-1.412 14.596a.25.25 0 0 1-.249.226H6.658a.25.25 0 0 1-.249-.226L4.997 6.178Z"/><path d="M9.206 7.501a.75.75 0 0 1 .793.705l.5 8.5A.75.75 0 1 1 9 16.794l-.5-8.5a.75.75 0 0 1 .705-.793Zm6.293.793A.75.75 0 1 0 14 8.206l-.5 8.5a.75.75 0 0 0 1.498.088l.5-8.5Z"/></svg>
                            
                        </li>
                    </ul>
                </div>
                    <Link to='/chat'><ChatLink></ChatLink></Link>
                    <ChatLink></ChatLink>
                    <ChatLink></ChatLink>
            </main>
        </div>
        
            
    )
}