import FormPage from './pages/FormPage';
import HomePage from './pages/HomePage';
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
