import React, { useState, useEffect, useRef } from 'react'

export default function Option({ editOption, index, removeOption, value }) {

    const [optionValue, setoptionvalue] = useState(value);
    const optionRef = useRef()

    useEffect(() => {
        setoptionvalue(value);
    }, [])

    useEffect(() => {
        if (optionRef && optionRef.current) {
            optionRef.current.style.height = "0px";
            const optHeight = optionRef.current.scrollHeight;
            if (optHeight > 50) {
                optionRef.current.style.height = optHeight + "px";
            }
            else {
                optionRef.current.style.height = "50px";
            }
        }
    }, [optionValue])

    const changeOptionvalue = (e) => {
        setoptionvalue(e.target.value);
        editOption(index, e.target.value);
    }

    const removeThisOption = () => {
        removeOption(index)
    }


    return (
        <div className='form-group'>
            <textarea type="text" className='form-control optionvalue' onChange={(e) => {changeOptionvalue(e)}} ref={optionRef} placeholder='Option' >
                {optionValue}
            </textarea>
            <span style={{marginTop: '-10px'}}>
            <i className="fa fa-times" onClick={() => { removeThisOption() }} aria-hidden="true"></i>
            </span>
           
        </div>
    )
}
