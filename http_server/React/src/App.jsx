import FormPage from './pages/FormPage';
import HomePage from './pages/HomePage';
import Auth from './pages/Auth';
import Chat from './pages/Chat';
import ChatsMenegerPage from './pages/ChatsMenegerPage';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route index element = {<HomePage/>}/>
        <Route path='/forma' element = {<FormPage/>}/>
        <Route path='/chats' element = {<ChatsMenegerPage/>}/>
        <Route path='/auth' element = {<Auth/>}/>
        <Route path='/chat' element = {<Chat/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
