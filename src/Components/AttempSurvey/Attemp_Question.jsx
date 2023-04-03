import React, { useState, useEffect, useRef } from 'react'

export default function Attemp_Question({ questionType, AddResponsesToQuestions, index }) {

    const [description, setdescription] = useState("")
    const [quesDescription2, setquesDescription2] = useState("")

    const questionAnswerRef = useRef();

    useEffect(() => {
        if (questionAnswerRef && questionAnswerRef.current) {
            questionAnswerRef.current.style.height = "0px";
            const descHeight = questionAnswerRef.current.scrollHeight;
            if (descHeight > 70) {
                questionAnswerRef.current.style.height = descHeight + "px";
            }
            else {
                questionAnswerRef.current.style.height = "70px";
            }
        }
    }, [description])

    const onchangeQuestionAnswer1 = (e) => {
        setdescription(e.target.value)
        AddResponsesToQuestions(index,e.target.value)
    }

    const onchangeQuestionAnswer2 = (e) => {
        setquesDescription2(e.target.value)
        AddResponsesToQuestions(index,e.target.value)
    }



    return (
        <div>
            {
                questionType == "date" || questionType == "file" || questionType == "url" ?
                    <div>
                        <input type={questionType} className='form-control' value={quesDescription2} onChange={(e) => { onchangeQuestionAnswer2(e) }} />
                    </div>
                    :
                    <textarea className='form-control questionAnswer' ref={questionAnswerRef} type={questionType} placeholder='Enter your Answer'
                        onChange={(e) => { onchangeQuestionAnswer1(e) }}>
                        {description}
                    </textarea>
            }
        </div>
    )
}
