import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import Login from "./Authentication/Login/Login";
import Register from './Authentication/Register/Register';
import Create_Form from './Components/CreateSurveyForm/Create_Form';
import Home from './Components/Home/Home';
import Survey_List from './Components/SurveyList/Survey_List';
import Attemp_Survey from './Components/AttempSurvey/Attemp_Survey';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
          <Route exact path='/' element={<Home/>}></Route>
            <Route exact path='/login' element={<Login/>}></Route>
            <Route exact path='/signup' element={<Register/>}></Route>
            <Route exact path='/create_survey' element={<Create_Form/>}></Route>
            <Route exact path='/survey_list' element={<Survey_List/>}></Route>
            <Route exact path='/attempSurvey/:id_data' element={<Attemp_Survey/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
