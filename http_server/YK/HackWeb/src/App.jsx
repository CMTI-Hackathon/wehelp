import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AuthPage from './assets/pages/Auth.jsx'
import ChatPage from './assets/pages/Chat.jsx'
function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route index element = {<AuthPage/>}/>
        <Route path='/auth' element = {<AuthPage/>}/>
        <Route path='/chat/:id' element = {<ChatPage/>}/>
      </Routes>
    </BrowserRouter>
  )

}

export default App
