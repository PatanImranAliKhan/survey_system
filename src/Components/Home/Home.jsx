import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import { useNavigate } from "react-router-dom";
import './home.css'

export default function Home() {

  var navigate = useNavigate();

  const navigateToCreateSurvey = () => {
    navigate('/create_survey')
  }

  const navigateToCreateQuiz = () => {
    navigate('/create_quiz')
  }

  return (
    <div>
      <Header />
        <div className='container'>
          <div className='home_content row'>
            <div className='homecontentforsurvey col-lg-6 col-sm-6 h-100'>
              <div className='display_box_survey' onClick={() => {navigateToCreateSurvey()}}>
                <i className='fa fa-plus' aria-hidden="true"></i>
              </div>
              <h4><Link className='contentlink' to="/create_survey">Create Survey</Link></h4>
            </div>

            <div className='homecontentforquiz col-lg-6 col-sm-6 h-100'>
              <div className='display_box_quiz' onClick={() => {navigateToCreateQuiz()}}>
                <i className='fa fa-star' aria-hidden="true"></i>
              </div>
              <h4><Link className='contentlink' to="/create_survey">Create Quiz</Link></h4>
            </div>
          </div>
        </div>
    </div>
  )
}
