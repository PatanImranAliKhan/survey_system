import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { getOneSurveyDetails } from '../Service/survey_service';
import Header from '../Header/Header';
import './attempsurvey.css'

export default function Attemp_Survey() {

    const [surveyDetails, setsurveyDetails] = useState([]);
    const [surveyId, setsurveyId] = useState(0);
    const { id_data } = useParams();

    useEffect(() => {
        const secretpass = "survey system is the good project";
        const bytes = CryptoJS.AES.decrypt(id_data, secretpass);
        const decdata = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setsurveyId(decdata);

        getOneSurveyDetails(decdata)
            .then((resp) => {
                console.log("resp : "+resp.data.details);
                if (resp.data.status != "Success") {
                    setsurveyDetails([]);
                }
                else {
                    setsurveyDetails(resp.data);
                }
            })
            .catch((err) => {
                console.log("error");
                setsurveyDetails([]);
            })
        setTimeout(() => {
            console.log(surveyDetails);
        }, 1000);
    }, [])

    const descriptionRef = useRef();
    const questionDescRef = useRef();


    return (
        <div>
            <Header />
            <div className='container'>
                {/* <div>

                </div>
                {
                    surveyDetails.length == 0 ? "" :
                        <div className='container'>
                            <div>
                                <div className='headinggroup'>
                                    <h2>{surveyDetails[0].title}</h2>
                                </div>
                            </div>
                            <br />
                            <div>
                                <div className='fomr-group'>
                                    <textarea className='form-control description' ref={descriptionRef}>
                                        {surveyDetails[0].description}
                                    </textarea>
                                </div>
                            </div>
                            <br />
                            <div>
                                {surveyDetails[0].questions}
                                {
                                    surveyDetails.questions.map((ques, i) =>
                                        <div>
                                            <b>Question : {i + 1}</b>
                                            <div className='questionbox'>

                                                <textarea className='form-control questionName' ref={questionDescRef}>
                                                    {ques.description}
                                                </textarea>
                                                <div>
                                                    {
                                                        ques.questionType == "radio" || ques.questionType == "check" ?
                                                            <div className='form-group'>
                                                                <div className='row'>
                                                                    {
                                                                        ques.options.map((e, i) =>
                                                                            <div className='col-sm-12 col-lg-6'>
                                                                                <div key={e} >
                                                                                    <input type={ques.questionType} />
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                            :
                                                            <div>
                                                                <input type={ques.questionType} />
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <br />
                            <div>
                                <div className="col-md-12 text-center">
                                    <button type="button" className="btn btn-primary">Submit</button>
                                    &nbsp;&nbsp;
                                    <button type="button" className="btn btn-warning">Cancel</button>
                                </div>
                            </div>
                        </div>

                } */}
            </div>
        </div>
    )
}
