import React, { useState, useEffect, useRef } from 'react'

export default function Attemp_Survey() {

    const [surveyData, setsurveyData] = useState({})

    useEffect(() => {
        
    }, [])
    

    return (
        <div>
            {/* <div className='container'>
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
                <div>
                    {
                        questionsList.map((ques, i) =>
                            <Add_Question key={i} changeQuestionDescription={changeQuestionDescription} index={i} question={ques}
                                changeQuestionOptions={changeQuestionOptions} changeQuestionType={changeQuestionType}
                                deleteQuestion={deleteQuestion} />
                        )
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
                        <button type="button" className="btn btn-warning">Cancel</button>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
