import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import Login from "./Authentication/Login/Login";
import Register from './Authentication/Register/Register';
import Create_Form from './Components/CreateForm/Create_Form';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login/>}></Route>
            <Route exact path='/signup' element={<Register/>}></Route>
            <Route exact path='/create' element={<Create_Form/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
