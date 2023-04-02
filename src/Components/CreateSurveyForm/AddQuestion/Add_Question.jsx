import React, { useRef, useState, useEffect } from 'react'
import Option from './Option';

export default function Add_Question({question,index,changeQuestionDescription,changeQuestionOptions,changeQuestionType,deleteQuestion}) {

    const questionDescRef = useRef();
    const [questionDescription, setquestionDescription] = useState("")

    const [selectedOption, setselectedOption] = useState("")
    const [optionsReq, setoptionsReq] = useState(false)

    const [options, setoptions] = useState(["", "", "", ""])

    useEffect(() => {
        if (questionDescRef && questionDescRef.current) {
            questionDescRef.current.style.height = "0px";
            const quesHeight = questionDescRef.current.scrollHeight;
            if (quesHeight > 50) {
                questionDescRef.current.style.height = quesHeight + "px";
            }
            else {
                questionDescRef.current.style.height = "50px";
            }
        }
    }, [questionDescription])

    const handleSelection = (e) => {
        setselectedOption(e.target.value);
        let optselcted = e.target.value;
        if (optselcted === "radio" || optselcted === "check") {
            setoptionsReq(true);
            setoptions(["", "", "", ""])
        }
        else {
            setoptionsReq(false);
        }
        changeQuestionType(index,e.target.value);
    }

    const onChangeQuesDescription = (e) => {
        setquestionDescription(e.target.value)
        changeQuestionDescription(index,e.target.value)
    }

    const IncreaseOptionCount = () => {
        const dup_options = [...options];
        dup_options.push("")
        setoptions(dup_options);
        changeQuestionOptions(index,dup_options)
    }

    const removeOption = (ind) => {
        const result = options.filter(function (item, i) {
            return i != ind
        })
        setoptions([]);
        setoptions(result);
        changeQuestionOptions(index,result);
    }

    const editOption = (ind, value) => {
        const dup_options = options;
        dup_options[ind] = value;
        setTimeout(() => {
            setoptions(dup_options)
        }, 10);
        changeQuestionOptions(index,dup_options);
    }

    const RemoveThisQuestion = () => {
        deleteQuestion(index)
    }


    return (
        <div>
            <b>Question : {index+1}</b>
            <div className='questionbox'>
                <div className='questionremove'>
                <i className="fa fa-times" onClick={() => { RemoveThisQuestion() }} aria-hidden="true"></i>
                </div>
                <textarea className='form-control questionName' ref={questionDescRef}
                    onChange={(e) => {onChangeQuesDescription(e)}} placeholder='Enter the QuestionDescription'>
                    {questionDescription}
                </textarea>
                <div className='questionType'>
                    <select className='form-control' value={selectedOption} onChange={(e) => { handleSelection(e) }}>
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="number">Number</option>
                        <option value="radio">Radio Box</option>
                        <option value="check">Check box</option>
                        <option value="date">Date</option>
                        <option value="url">URL</option>
                        <option value="file">file</option>
                    </select>
                </div>
                <div>
                    {
                        optionsReq ?
                            <div className='form-group'>
                                <div className='addOption'>
                                    <button className='btn btn-secondary' onClick={() => {IncreaseOptionCount()}}><i className="fa fa-plus" aria-hidden="true"></i> Option</button>
                                </div>
                                <div className='row'>
                                    {
                                        options.map((e, i) =>
                                            <div className='col-sm-12 col-lg-6'>
                                                <div key={e} >
                                                    <Option editOption={editOption} value={e} index={i} removeOption={removeOption} />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            : ""
                    }
                </div>
            </div>
        </div>
    )
}
