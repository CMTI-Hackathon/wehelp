import FormPage from './pages/FormPage';
import HomePage from './pages/HomePage';
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
        <Route path='/' element = {<HomePage/>}/>
        <Route path='/forma' element = {<FormPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
