import FormPage from './pages/FormPage';
import HomePage from './pages/HomePage';
import Auth from './pages/Auth';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import ChatsMenegerPage from './pages/ChatsMenegerPage';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";
function App() {
 

  return (
    <HashRouter basename='/'>
      <Routes>
        <Route index element = {<Home/>}/>
        <Route path = "/" element = {<Home/>}/>
        <Route path='/forma' element = {<FormPage/>}/>
        {/* <Route path='/chats' element = {<ChatsMenegerPage/>}/> */}
        <Route path='/auth' element = {<Auth/>}/>
        {/* <Route path='/chat/:id' element = {<Chat/>}/> */}
        <Route path='/post' element= {<PostPage/>}/>
        <Route path='/home' element= {<HomePage/>}/>
      </Routes>
    </HashRouter>
    
  )
}

export default App
