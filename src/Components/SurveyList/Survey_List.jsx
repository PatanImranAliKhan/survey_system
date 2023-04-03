import React, { useState, useEffect } from 'react';
import { getAllSurveyDetails } from '../Service/survey_service';
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
        getAllSurveyDetails(user_local_details.email)
            .then((resp) => {
                console.log(resp);
                setuserServeyDetails(resp.data.response.surveyDetailsOfUser);
                setothersServeyDetails(resp.data.response.surveyDetailsOfOthers);
            })
            .catch((err) => {
                setuserServeyDetails([]);
                setothersServeyDetails([]);
            })
    }, [])

    const clickCreateForm = () => {
        navigate("/create_survey")
    }

    const navigateToLink = (id) => {
        const secretpass = "survey system is the good project";
        const data = CryptoJS.AES.encrypt(
            JSON.stringify(id),
            secretpass
        ).toString();
        console.log(data);

        navigate(`/attempSurvey/${data.toString()}`);
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
                            <div className='jumbotron'>
                                <div>
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
                                                    <td onClick={() => {navigateToLink(data._id)}}>{data._id}</td>
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
                                                    <td onClick={() => {navigateToLink(data._id)}}>{data._id}</td>
                                                </tr>
                                            </tbody>
                                        })
                                    }

                                </table>
                            </div>
                            :
                            <div className='jumbotron'>
                                <div>
                                    <b>There is no Others Survey Forms</b>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}