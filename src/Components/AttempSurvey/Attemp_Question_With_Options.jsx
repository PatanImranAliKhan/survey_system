import React, { useState, useEffect } from 'react'

export default function Attemp_Question_With_Options({ ques, index, AddResponsesToQuestions }) {

    const [check_resp, setcheck_resp] = useState([])

    useEffect(() => {
        initializeCheckResp();
    }, [])

    const initializeCheckResp = () => {
        let n=ques.options.length;
        var abc=[]
        for(let i=0;i<n;i++)
        {
            abc.push(0);
        }
        setcheck_resp(abc);
    }

    const onChangeRadiohandler = async(ind) => {
        AddResponsesToQuestions(index,ind+1);
    }

    const onChangeCheckhandler = async(ind) => {
        var result = [];
        check_resp[ind]+=1;
        for(let i=0;i<check_resp.length;i++)
        {
            if(check_resp[i]%2!=0)
            {
                result.push(i+1);
            }
        }

        AddResponsesToQuestions(index,result);
    }

    return (
        <div className='row'>
            {
                ques.questionType=="radio" ?
                ques.options.map((item, ind) =>
                    <div className='col-sm-12 col-lg-6'>
                        <div key={ind} className='displayoption'>
                            <input type={ques.questionType} name='radio' className='optiontype' onChange={() => { onChangeRadiohandler(ind) }} />
                            &nbsp;&nbsp;
                            <label className='optionlabel'>{item}</label>
                        </div>
                    </div>
                ):
                ques.options.map((item, ind) =>
                    <div className='col-sm-12 col-lg-6'>
                        <div key={ind} className='displayoption'>
                            <input type={ques.questionType} name={ind} className='optiontype' onChange={() => { onChangeCheckhandler(ind) }} />
                            &nbsp;&nbsp;
                            <label className='optionlabel'>{item}</label>
                        </div>
                    </div>
                )
            }
        </div>

    )
}
