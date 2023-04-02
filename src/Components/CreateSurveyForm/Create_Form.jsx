import React, { useState, useEffect, useRef } from 'react'
import './createform.css'
import Add_Question from './AddQuestion/Add_Question';

export default function Create_Form() {

    const sampleQuestion = {
        description : "",
        questionType : "text",
        options : ["","","",""]
    };

    const [questionsList, setquestionsList] = useState([{
        description : "",
        questionType : "text",
        options : ["","","",""]
    }])

    const [disableQuestionTitle, setdisableQuestionTitle] = useState(true)
    const [QuestionTitle, setQuestionTitle] = useState("");
    const inputRef = useRef(null);


    const descriptionRef = useRef()
    const [description, setdescription] = useState("")

    const onChangeDescription = (e) => {
        setdescription(e.target.value);
    }

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
        const dup_ques = [...questionsList];
        dup_ques.push(sampleQuestion)
        setquestionsList(dup_ques);
        console.log(dup_ques);
    }

    const changeQuestionDescription = (ind, val) => {
        const dup_ques = questionsList;
        dup_ques[ind].description = val;
        setquestionsList(dup_ques)
    }

    const changeQuestionOptions = (ind, arr) => {
        const dup_ques = questionsList;
        dup_ques[ind].options = arr;
        setquestionsList(dup_ques)
    }

    const changeQuestionType = (ind, val) => {
        const dup_ques = questionsList;
        dup_ques[ind].questionType = val;
        setquestionsList(dup_ques)
    }

    const deleteQuestion = (ind) => {
        const result = questionsList.filter(function (item, i) {
            return i != ind
        })
        setquestionsList([]);
        setquestionsList(result);
    }

    const filterOptions = (ques_dup) => {
        var filtered_result = []
        ques_dup.forEach((element) => {
            if(element.questionType=="radio" || element.questionType=="check")
            {
                element.options = element.options.filter((item) => {
                    return item!=""
                })
                console.log("options : "+element.options);
            }
            filtered_result.push(element);
        })
        return filtered_result;
    }

    const Add_options_as_Constraints = (ques) => {
        ques.map((item) => {
            var survey_response = {};
            if(item.questionType=="radio" || item.questionType=="check")
            {
                item.options.forEach((element) => {
                    survey_response[element]=0;
                })
            }
            else
            {
                survey_response['responses']=[];
            }
            item['survey_response'] = survey_response;
            return item;
        })
        return ques
    }

    const SubmitQuestions = () => {
        var ques_dup = [...questionsList];
        ques_dup = ques_dup.filter((item) => {
            console.log("item  ",item.description==null , "  abc ",item.description=="");
            return item.description!=""
        })
        if(ques_dup.length!=questionsList.length)
        {
            alert("some Descriptions are missing Please fill it out")
            return;
        }
        if(ques_dup.length==0)
        {
            questionsList.push(sampleQuestion);
            window.alert("Please Fill the Questions Again, We found it with Empty Questions Added");
        }
        console.log("before filter opt : "+ques_dup);
        ques_dup = filterOptions(ques_dup);
        console.log("After filter opt");
        printdata(ques_dup)
        console.log(Add_options_as_Constraints(ques_dup));
        ques_dup=Add_options_as_Constraints(ques_dup);
        setquestionsList(ques_dup);
        setTimeout(() => {
            postQuestionsToDB();
        }, 100);
    }

    const postQuestionsToDB = () => {
        const objPost = {
            "title": QuestionTitle,
            "description": description,
            "questions": questionsList
        }
        console.log(objPost);
    }

    const printdata = (ques) => {
        for(let i=0;i<ques.length;i++)
        {
            console.log(ques[i].description+ " "+ ques[i].questionType + "  "+ ques[i].options);
            console.log(ques[i].survey_response);
        }
    }

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='headinggroup'>
                        <h2>{QuestionTitle}</h2>
                    </div>
                </div>
                <br />
                <div>
                    <div className='form-group' onClick={() => {HandleQuestionTitleDisability()}}>
                        <input className='form-control' placeholder='Survey Form Name' disabled={disableQuestionTitle} value={QuestionTitle} ref={inputRef}
                            onBlur={() => { setdisableQuestionTitle(true) }}
                            onChange={(e) => { setQuestionTitle(e.target.value) }} required />
                    </div>
                    <br />
                    <div className='fomr-group'>
                        <textarea className='form-control description' ref={descriptionRef}
                            onChange={(e) => {onChangeDescription(e)}} placeholder='Enter the description of the Survey'>
                            {description}
                        </textarea>
                    </div>
                </div>
                <br />
                <div>
                    {
                        questionsList.map((ques, i) =>
                            <Add_Question key={i} changeQuestionDescription={changeQuestionDescription} index={i} question={ques}
                                changeQuestionOptions={changeQuestionOptions} changeQuestionType={changeQuestionType} 
                                deleteQuestion={deleteQuestion}/>
                        )
                    }
                </div>
                <br />
                <div className='addquestionbut'>
                    <button onClick={() => { AddNewQuestion() }}><i className="fa fa-plus" aria-hidden="true"></i> Add Question</button>
                </div>
                <div>
                    <div className="col-md-12 text-center">
                        <button type="button" className="btn btn-primary" onClick={() => {SubmitQuestions()}}>Submit</button>
                        &nbsp;&nbsp;
                        <button type="button" className="btn btn-warning">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
