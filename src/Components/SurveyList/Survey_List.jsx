import React, { useState, useEffect } from 'react';
import { getAllSurveyDetails } from '../Service/survey_service';
import Header from '../Header/Header';
import './surveylist.css';
import { useNavigate } from "react-router-dom";
import bg from './Bg.jpg';

export default function Survey_List() {

    const [userServeyDetails, setuserServeyDetails] = useState([]);
    const [othersServeyDetails, setothersServeyDetails] = useState([]);

    var navigate = useNavigate();

    useEffect(() => {
        const user_local_details = JSON.parse(localStorage.getItem('userdetails'));
        if (user_local_details == null || user_local_details == "") {
            navigate("/")
        }
        getSurveyDetail(user_local_details.email);
    }, [])

    const getSurveyDetail = async (email) => {
        await getAllSurveyDetails(email)
            .then((resp) => {
                console.log(resp);
                setuserServeyDetails(resp.data.response.surveyDetailsOfUser);
                setothersServeyDetails(resp.data.response.surveyDetailsOfOthers);
            })
            .catch((err) => {
                setuserServeyDetails([]);
                setothersServeyDetails([]);
            })
    }

    const clickCreateForm = () => {
        navigate("/create_survey")
    }

    const navigateToAnalyticsLink = (id) => {
        navigate(`/viewsurvey/${id}`);
    }

    const navigateToLink = (id) => {
        navigate(`/attempSurvey/${id}`);
    }


    return (
        <div>
            <Header />
            <div style={{ 'backgroundImage': `url(${bg})`, height: '91vh', objectFit: 'cover', backgroundSize: '100%' }}>
                &nbsp;
                <div className='container'>
                    <div className='addsurveybutton'>
                        <button className='btn' onClick={() => { clickCreateForm() }}><i className='fa fa-plus'></i>Create Survey</button>
                    </div>

                    <label><b>Your Survey Forms</b></label>
                    <br />
                    <div>
                        {
                            userServeyDetails.length == 0 ?
                                <div >
                                    <br />
                                    <div className='jumbotron'>
                                        <b>You have not created any Surveys</b>
                                    </div>
                                </div>
                                :
                                <div class="table-responsive-md">
                                    <table class="table table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">S.no</th>
                                                <th scope="col">Survey Title</th>
                                                <th scope='col'>Link</th>
                                            </tr>
                                        </thead>
                                        {
                                            userServeyDetails.map((data, ind) => {
                                                return <tbody key={ind}>
                                                    <tr>
                                                        <th scope="row">{ind + 1}</th>
                                                        <td>{data.title}</td>
                                                        <td onClick={() => { navigateToAnalyticsLink(data._id) }}><i class="fa fa-external-link-square" aria-hidden="true"></i></td>
                                                    </tr>
                                                </tbody>
                                            })
                                        }

                                    </table>
                                </div>
                        }
                    </div>
                    <br />
                    <br />
                    <label><b>Others Survey Forms</b></label>
                    <br />
                    <div>
                        {
                            othersServeyDetails.length != 0 ?
                                <div class="table-responsive-md">
                                    <table class="table table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">S.no</th>
                                                <th scope="col">Survey Title</th>
                                                <th scope='col'>Link</th>
                                            </tr>
                                        </thead>
                                        {
                                            othersServeyDetails.map((data, ind) => {
                                                return <tbody key={ind}>
                                                    <tr>
                                                        <th scope="row">{ind + 1}</th>
                                                        <td>{data.title}</td>
                                                        <td onClick={() => { navigateToLink(data._id) }}><i class="fa fa-external-link-square" aria-hidden="true"></i></td>
                                                    </tr>
                                                </tbody>
                                            })
                                        }

                                    </table>
                                </div>
                                :
                                <div >
                                    <br />
                                    <div className='jumbotron'>
                                        <b>There is no Others Survey Forms</b>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
