import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getOneSurveyDetails, UpdateSurveyByFillingByUsers } from '../Service/survey_service';
import Header from '../Header/Header';
import './attempsurvey.css';
import Attemp_Question from './Attemp_Question';
import { useNavigate } from "react-router-dom";
import Attemp_Question_With_Options from './Attemp_Question_With_Options';

export default function Attemp_Survey() {

    const [surveyDetails, setsurveyDetails] = useState([]);
    const [surveyId, setsurveyId] = useState(0);
    const { id_data } = useParams();

    const [responses, setresponses] = useState([]);
    
    var navigate = useNavigate();

    useEffect(() => {
        setsurveyId(id_data);
        getSurveyDetailsFormDB();
    }, [])

    const getSurveyDetailsFormDB = async () => {
        await getOneSurveyDetails(id_data)
            .then((resp) => {

                if (resp.data.status != "Success") {
                    setsurveyDetails([]);
                }
                else {
                    console.log(resp.data.details);
                    setsurveyDetails(resp.data.details);
                    setresponsesdatatoQuestions(resp.data.details.questions)
                }
            })
            .catch((err) => {
                console.log("error");
                setsurveyDetails([]);
            })

    }

    const setresponsesdatatoQuestions = (ques) => {
        setresponses([]);
        var ress=[]
        var n=ques.length;
        for(let i=0;i<n;i++)
        {
            if(ques.questionType=="checkbox")
            {
                ress.push([]);
            }
            else
            {
                ress.push("");
            }
        }
        setresponses(ress);
    }

    const descriptionRef = useRef();

    const AddResponsesToQuestions = (ind, answer) => {
        var dup_resp = [... responses]
        dup_resp[ind]=answer;
        setresponses(dup_resp);
    }

    const cancelPage = () => {
        navigate(-1);
    }

    const SubmitHandler = () => {
        var ques = [...surveyDetails['questions']];
        ques = ques.map((item, i) => {

            if(item.questionType=="checkbox")
            {
                item.survey_response=item.survey_response.concat(responses[i]);
            }
            else
            {
                item.survey_response.push(responses[i]);
            }
            return item;
        })
        console.log(ques);
        UpdateSurveyByFillingByUsers(surveyDetails._id, ques)
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            console.log("err");
        })
    }


    return (
        <div>
            <Header />
            <div className='container'>
                <div>

                </div>
                {
                    surveyDetails == {} ? "" :
                        <div className='container'>
                            <div>
                                <div className='headinggroup'>
                                    <h2>{surveyDetails.title}</h2>
                                </div>
                            </div>
                            <br />
                            <div>
                                <div className='fomr-group'>
                                    <textarea className='form-control description' ref={descriptionRef} value={surveyDetails.description} disabled>
                                    </textarea>
                                </div>
                            </div>
                            <br />
                            <div>
                                {
                                    surveyDetails.questions!="" && surveyDetails.questions!=null && surveyDetails.questions!=[]?
                                            surveyDetails.questions.map((ques, i) =>
                                                <div>
                                                    <b>Question : {i + 1}</b>
                                                    <div className='questionbox'>
                                                        <b>Question Description: </b>
                                                        <br />
                                                        <label style={{margin: '10px 20px'}}>
                                                            {ques.description}
                                                        </label>
                                                        <br />
                                                        <b>Answer: </b>
                                                        <div>
                                                            {
                                                                ques.questionType == "radio" || ques.questionType == "checkbox" ?
                                                                    <div className='form-group'>
                                                                        <Attemp_Question_With_Options AddResponsesToQuestions={AddResponsesToQuestions} ques={ques} index={i}/>
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        <Attemp_Question index={i} AddResponsesToQuestions={AddResponsesToQuestions} questionType={ques.questionType} />
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        :""}

                            </div>
                            <br />
                            <div>
                                <div className="col-md-12 text-center">
                                    <button type="button" className="btn btn-primary" onClick={() => {SubmitHandler()}}>Submit</button>
                                    &nbsp;&nbsp;
                                    <button type="button" className="btn btn-warning" onClick={() => {cancelPage()}} >Cancel</button>
                                </div>
                            </div>
                        </div>

                }
            </div>
        </div>
    )
}
