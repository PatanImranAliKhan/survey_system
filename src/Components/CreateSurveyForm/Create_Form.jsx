import React, { useState, useEffect, useRef } from 'react'
import './createform.css'
import Add_Question from './AddQuestion/Add_Question';
import { postSurvey } from '../Service/survey_service';
import Header from '../Header/Header';
import { useNavigate } from "react-router-dom";

export default function Create_Form() {

    const sampleQuestion = {
        description: "",
        questionType: "text",
        options: ["", "", "", ""]
    };

    const [questionsList, setquestionsList] = useState([{
        description: "",
        questionType: "text",
        options: ["", "", "", ""]
    }])

    var navigate = useNavigate();

    const [disableQuestionTitle, setdisableQuestionTitle] = useState(true)
    const [QuestionTitle, setQuestionTitle] = useState("");
    const inputRef = useRef(null);


    const descriptionRef = useRef()
    const [description, setdescription] = useState("")

    const [successmessage, setsuccessmessage] = useState("")
    const [errormessage, seterrormessage] = useState("")

    const [dateOfExpiry, setdateOfExpiry] = useState(new Date());
    const [dateOfExpiryFormatted, setdateOfExpiryFormatted] = useState(new Date());

    const [userDetails, setuserDetails] = useState()

    const changeDate = (e) => {
        setdateOfExpiry(e.target.value);
        setdateOfExpiryFormatted(new Date(e.target.value));
    }

    const onChangeDescription = (e) => {
        setdescription(e.target.value);
    }

    useEffect(() => {
        const user_local_details = JSON.parse(localStorage.getItem('userdetails'));
        setuserDetails(user_local_details)
    }, [])
    

    useEffect(() => {
        if (descriptionRef && descriptionRef.current) {
            descriptionRef.current.style.height = "0px";
            const descHeight = descriptionRef.current.scrollHeight;
            if (descHeight > 100) {
                descriptionRef.current.style.height = descHeight + "px";
            }
            else {
                descriptionRef.current.style.height = "100px";
            }
        }
    }, [description])

    const HandleQuestionTitleDisability = () => {
        setdisableQuestionTitle(false);
        setTimeout(() => {
            inputRef.current.focus()
        }, 0);
    }

    const AddNewQuestion = () => {
        var dup_ques = [...questionsList];
        dup_ques.push(sampleQuestion)
        setquestionsList(dup_ques);
    }

    const changeQuestionDescription = (ind, val) => {
        var dup_ques = questionsList;
        dup_ques[ind].description = val;
        setquestionsList(dup_ques)
    }

    const changeQuestionOptions = (ind, arr) => {
        var dup_ques = questionsList;
        dup_ques[ind].options = arr;
        setquestionsList(dup_ques)
    }

    const changeQuestionType = (ind, val) => {
        var dup_ques = questionsList;
        dup_ques[ind].questionType = val;
        setquestionsList(dup_ques)
    }

    const deleteQuestion = (ind) => {
        var result = questionsList.filter(function (item, i) {
            return i != ind
        })
        setquestionsList([]);
        setquestionsList(result);
    }

    const filterOptions = (ques_dup) => {
        var filtered_result = []
        ques_dup.forEach((element) => {
            if (element.questionType == "radio" || element.questionType == "checkbox") {
                element.options = element.options.filter((item) => {
                    return item != ""
                })
            }
            filtered_result.push(element);
        })
        return filtered_result;
    }

    const Add_options_as_Constraints = (ques) => {
        ques.map((item) => {
            item['survey_response'] = [];
            return item;
        })
        return ques
    }

    const SubmitQuestions = () => {
        var ques_dup = [...questionsList];
        ques_dup = ques_dup.filter((item) => {
            return item.description != ""
        })
        if (ques_dup.length != questionsList.length) {
            alert("some Descriptions are missing Please fill it out")
            return;
        }
        if (ques_dup.length == 0) {
            questionsList.push(sampleQuestion);
            window.alert("Please Fill the Questions Again, We found it with Empty Questions Added");
        }
        ques_dup = filterOptions(ques_dup);
        ques_dup = Add_options_as_Constraints(ques_dup);
        setquestionsList(ques_dup);
        setTimeout(() => {
            postQuestionsToDB();
        }, 100);
    }

    const postQuestionsToDB = async() => {
        const dt = new Date();
        const objPost = {
            "title": QuestionTitle,
            "description": description,
            "questions": questionsList,
            "isActive": true,
            "dateOfCreation":dt,
            "dateOfExpiry": dateOfExpiryFormatted,
            "createdBy": userDetails.email
        }
        console.log(objPost);
        await postSurvey(objPost)
        .then((surveyResponse) => {
            console.log(surveyResponse);
            if(surveyResponse.data.status == "Success")
            {
                setsuccessmessage("Submitted Succesfully");
                seterrormessage("")
                setquestionsList(sampleQuestion);
                navigate("/survey_list")
            }
            else
            {
                seterrormessage("failed to Save the Survey, Please try After some time");
                setsuccessmessage("")
            }
        })
        .catch((err) => {
            seterrormessage("failed to Save the Survey, Please try After some time");
            setsuccessmessage("")
        })
    }

    const cancelForm = () => {
        navigate("/")
    }

    return (
        <div>
            <Header />
            {
                errormessage ?
                    <div>
                        <div className="alert alert-danger">
                            {errormessage}
                        </div>
                    </div>
                    : ""}
            {
                successmessage ?
                    <div>
                        <div className="alert alert-success">
                            {successmessage}
                        </div>
                    </div>
                    : ""}
            <div className='container'>
                <div>
                    <div className='headinggroup'>
                        <h2>{QuestionTitle}</h2>
                    </div>
                </div>
                <br />
                <div>
                    <div className='form-group' onClick={() => { HandleQuestionTitleDisability() }}>
                        <input className='form-control' placeholder='Survey Form Name' disabled={disableQuestionTitle} value={QuestionTitle} ref={inputRef}
                            onBlur={() => { setdisableQuestionTitle(true) }}
                            onChange={(e) => { setQuestionTitle(e.target.value) }} required />
                    </div>
                    <br />
                    <div className='fomr-group'>
                        <textarea className='form-control description' ref={descriptionRef}
                            onChange={(e) => { onChangeDescription(e) }} placeholder='Enter the description of the Survey'>
                            {description}
                        </textarea>
                    </div>
                </div>
                <br />
                <div className='form-group'>
                    <label>Date of Expiry: </label>
                    <input type='date' className='form-control' style={{width: '250px'}} value={dateOfExpiry} onChange={(e) => {  changeDate(e) }} />
                </div>
                <div>
                    {
                        questionsList.length!=0 ?
                        questionsList.map((ques, i) =>
                            <Add_Question key={i} changeQuestionDescription={changeQuestionDescription} index={i} question={ques}
                                changeQuestionOptions={changeQuestionOptions} changeQuestionType={changeQuestionType}
                                deleteQuestion={deleteQuestion} />
                        ):""
                    }
                </div>
                <br />
                <div className='addquestionbut'>
                    <button onClick={() => { AddNewQuestion() }}><i className="fa fa-plus" aria-hidden="true"></i> Add Question</button>
                </div>
                <div>
                    <div className="col-md-12 text-center">
                        <button type="button" className="btn btn-primary" onClick={() => { SubmitQuestions() }}>Submit</button>
                        &nbsp;&nbsp;
                        <button type="button" className="btn btn-warning" onClick={() => { cancelForm() }}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
