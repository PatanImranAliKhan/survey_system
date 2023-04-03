import React, { useState, useEffect } from 'react';
import { getAllSurveyDetails, changeActiveStatus } from '../Service/survey_service';
import Header from '../Header/Header';
import './surveylist.css';
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';

export default function Survey_List() {

    const [userServeyDetails, setuserServeyDetails] = useState([]);
    const [othersServeyDetails, setothersServeyDetails] = useState([]);

    var navigate = useNavigate();

    useEffect(() => {
        const user_local_details = JSON.parse(localStorage.getItem('userdetails'));
        getSurveyDetail(user_local_details.email);
    }, [])

    const getSurveyDetail = async (email) => {
        await getAllSurveyDetails(email)
        .then((resp) => {
            console.log(resp);
            setuserServeyDetails(resp.data.response.surveyDetailsOfUser);
            setothersServeyDetails(resp.data.response.surveyDetailsOfOthers);
            // FilterActiveSurveys(resp.data.response.surveyDetailsOfOthers,email);
        })
        .catch((err) => {
            setuserServeyDetails([]);
            setothersServeyDetails([]);
        })
    }

    const FilterActiveSurveys = (surveyDetails,email) => {
        const today = new Date();
        var isAnyDeactivecalls = false;
        surveyDetails.forEach(async (element) => {
            if(today - new Date(element.dateOfCreation) < 0)
            {
                await changeActiveStatus(element._id,false);
                isAnyDeactivecalls=true;
            }
        })
        if(isAnyDeactivecalls)
        {
            getSurveyDetail(email);
        }
    }

    const clickCreateForm = () => {
        navigate("/create_survey")
    }

    const navigateToLink = (id) => {
        navigate(`/attempSurvey/${id}`);
    }


    return (
        <div>
            <Header />
            <div className='container'>
                <div className='addsurveybutton'>
                    <button className='btn' onClick={() => { clickCreateForm() }}><i className='fa fa-plus'></i>Create Survey</button>
                </div>

                <label><b>Your Survey Forms</b></label>
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
                                                    <td onClick={() => { navigateToLink(data._id) }}><i class="fa fa-external-link-square" aria-hidden="true"></i></td>
                                                </tr>
                                            </tbody>
                                        })
                                    }

                                </table>
                            </div>
                    }
                </div>
                <br />
                <label><b>Others Survey Forms</b></label>
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
    )
}
