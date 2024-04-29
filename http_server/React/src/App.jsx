import FormPage from './pages/FormPage';
import HomePage from './pages/HomePage';
import Auth from './pages/Auth';
import Chat from './pages/Chat';
import PostPage from './pages/PostPage';
import ChatsMenegerPage from './pages/ChatsMenegerPage';
import {
  HashRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
function App() {
 

  return (
    <HashRouter>
      <Routes>
        <Route index element = {<HomePage/>}/>
        <Route path='/forma' element = {<FormPage/>}/>
        <Route path='/chats' element = {<ChatsMenegerPage/>}/>
        <Route path='/auth' element = {<Auth/>}/>
        <Route path='/post' element= {<PostPage/>}/>
        <Route path='/chat' element = {<Chat/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
