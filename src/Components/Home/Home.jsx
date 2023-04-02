import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import { useNavigate } from "react-router-dom";
import './home.css'
import analyze from './analyze.png';

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
        <div class="top">
          <div class="leftcontent">
            <span class="textLeftTop">Create your own Survey. <span class="specialTextOnline">ONLINE</span></span><br />
            <span><span class="textLeftTopDown">... for Free.</span></span>
          </div>
          <div class="rightimage">
            <img class="image" style={{ borderRadius: '50%', width: '60%', height: '60%', marginLeft: '150px', marginTop: '100px' }} src={analyze} alt="doctor" />
          </div>
        </div>
        <br />
          <hr />
        <div className='home_content row'>
          <div className='homecontentforsurvey col-lg-6 col-sm-6 h-100'>
            <div className='display_box_survey' onClick={() => { navigateToCreateSurvey() }}>
              <i className='fa fa-plus' aria-hidden="true"></i>
            </div>
            <h4><Link className='contentlink' to="/create_survey">Create Survey</Link></h4>
          </div>

          <div className='homecontentforquiz col-lg-6 col-sm-6 h-100'>
            <div className='display_box_quiz' onClick={() => { navigateToCreateQuiz() }}>
              <i className='fa fa-star' aria-hidden="true"></i>
            </div>
            <h4><Link className='contentlink' to="/create_survey">Create Quiz</Link></h4>
          </div>
        </div>
      </div>
    </div>
  )
}
