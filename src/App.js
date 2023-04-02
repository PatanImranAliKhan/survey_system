import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import Login from "./Authentication/Login/Login";
import Register from './Authentication/Register/Register';
import Create_Form from './Components/CreateSurveyForm/Create_Form';
import Home from './Components/Home/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/signup' element={<Register/>}></Route>
            <Route exact path='/create_survey' element={<Create_Form/>}></Route>
            <Route exact path='/' element={<Home/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
