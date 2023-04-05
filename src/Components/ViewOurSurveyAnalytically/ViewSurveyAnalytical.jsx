import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './viewsurvey.css'
import { getOneSurveyDetails, changeActiveStatus } from '../Service/survey_service';
import Header from '../Header/Header';
import ViewAnalyticalresponse from './ViewAnalyticalresponse';
import ViewTextResponse from './ViewTextResponse';

export default function ViewSurveyAnalytical() {

    const { id_data } = useParams();

    const sample_survey = {
        createdBy: "survey@gmail.com",
        dateOfCreation: new Date(),
        dateOfExpiry: new Date(),
        description: "decription",
        isActive: true,
        questions: [],
        title: "title",
        _id: "1234"
    }

    const [surveyDetails, setsurveyDetails] = useState(sample_survey);
    const [surveyAnalyticalresult, setsurveyAnalyticalresult] = useState();
    const [isActive, setisActive] = useState(true);

    const [showExpiryDateinput, setshowExpiryDateinput] = useState(false);
    const [newdateOfExpiry, setnewdateOfExpiry] = useState(new Date());
    const [newFormattedDataofExpiry, setnewFormattedDataofExpiry] = useState(new Date());

    useEffect(() => {
        getSurveyDetailsfromDB();
    }, [])

    function getSurveyDetailsfromDB() {
        getOneSurveyDetails(id_data)
            .then((resp) => {
                setsurveyDetails(resp.data.details);
                ExtractAnalyticdata(resp.data.details);
                setisActive(resp.data.details.isActive);
            })
            .catch((err) => {
                console.log("error analytically : ", err);
                setsurveyDetails([]);
            })
    }

    async function ExtractAnalyticdata(details) {
        const questions = details.questions;
        var result = [];
        await questions.forEach((element) => {
            if (element.questionType == "radio" || element.questionType == "checkbox") {
                var analytical_data = {};
                var options = element.options;
                options.forEach((option) => {
                    analytical_data[option] = 0;
                });
                element.survey_response.forEach((res) => {
                    analytical_data[options[res - 1]] += 1;
                })
                result.push(analytical_data);
            }
            else {
                result.push(element.survey_response);
            }
        })
        console.log(result);
        setsurveyAnalyticalresult(result);
    }

    const deactivateSurveyForm = async () => {
        await changeActiveStatus(surveyDetails._id, false, surveyDetails.dateOfExpiry)
            .then((resp) => {
                console.log("deactivate", resp);
                setisActive(false);
                setshowExpiryDateinput(false);
                window.location.reload(false);
            })
    }

    const showExpiryForInput = () => {
        setshowExpiryDateinput(true);
    }

    const changeDate = (e) => {
        setnewdateOfExpiry(e.target.value);
        setnewFormattedDataofExpiry(new Date(e.target.value));
    }

    const activateSurveyForm = async () => {
        if (newFormattedDataofExpiry - new Date() <= 0) {
            return;
        }
        await changeActiveStatus(surveyDetails._id, true, newFormattedDataofExpiry)
            .then((resp) => {
                console.log("activate", resp);
                setshowExpiryDateinput(false);
                setisActive(true);
                window.location.reload(false);
            })
    }


    return (
        <div>
            <Header />
            <div className='container'>
                <div>
                    {
                        !isActive ?
                            <div className='changestatus'>
                                <div className='activationbutton'>
                                    <button className='btn btn-success' onClick={() => { showExpiryForInput() }}>Activate</button>
                                </div>
                            </div>
                            :
                            <div className='changestatus'>
                                <div className='activationbutton'>
                                    <button className='btn btn-danger' onClick={() => { deactivateSurveyForm() }}>Expire Form</button>
                                </div>
                            </div>
                    }
                    <div>
                        {
                            showExpiryDateinput ?
                                <div>
                                    <div className='form-group'>
                                        <label>Date of Expiry: </label>
                                        <input type='date' className='form-control' style={{ width: '250px' }} value={newdateOfExpiry} onChange={(e) => { changeDate(e) }} />
                                    </div>
                                    <br />
                                    <div>
                                        <button className='btn btn-primary' onClick={() => { activateSurveyForm() }}>Activate</button>
                                    </div>
                                </div>
                                : ""
                        }
                    </div>
                </div>
                <div>
                    {
                        surveyDetails != {} ?
                            <div>
                                <div>
                                    <label><b>Survey Title : </b></label>
                                    <br />
                                    <textarea className='form-control surveytitle' rows="3" disabled placeholder={surveyDetails.title}></textarea>
                                </div>
                                <br />
                                <div>
                                    <label><b>Survey Description : </b></label>
                                    <br />
                                    <textarea className='form-control surveydesc' rows="5" disabled placeholder={surveyDetails.description}></textarea>
                                </div>
                                <div>
                                    {
                                        surveyDetails.questions != "" && surveyDetails.questions != null && surveyDetails.questions != [] && surveyDetails.questions != undefined ?
                                            surveyDetails.questions.map((ques, i) =>
                                                <div key={i}>
                                                    <b>Question : {i + 1}</b>
                                                    <div className='questionbox'>
                                                        <b>Question Description: </b>
                                                        <br />
                                                        <label style={{ margin: '10px 20px' }}>
                                                            {ques.description}
                                                        </label>
                                                        <br />
                                                        <b>Responses: </b>
                                                        <div>
                                                            {
                                                                ques.questionType == "radio" || ques.questionType == "checkbox" ?
                                                                    <div className='form-group'>
                                                                        <ViewAnalyticalresponse Responses={surveyAnalyticalresult} index={i} options={ques.options} />
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        <ViewTextResponse Responses={surveyAnalyticalresult} index={i}/>
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            : ""}
                                </div>
                            </div>
                            : ""
                    }
                </div>
            </div>
        </div>
    )
}
