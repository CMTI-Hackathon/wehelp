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
        {/* <Route path='/' element = {<HomePage/>}/> */}
        {/* <Route path='/form' element = {<FormPage/>}/> */}
        <Route path='/auth' element = {<AuthPage/>}/>
        <Route path='/' element = {<AuthPage/>}/> {/*Temporary */}
        <Route path='/chat' element = {<ChatPage/>}/>
      </Routes>
    </BrowserRouter>
  )

}

export default App
