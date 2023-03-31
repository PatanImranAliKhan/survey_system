import React, { useState, useEffect, useRef } from 'react'
import './createform.css'

export default function Create_Form() {


    const [questionsList, setquestionsList] = useState({})

    const [disableHeaderName, setdisableHeaderName] = useState(true)
    const [headerName, setheaderName] = useState("");
    const [selectedOption, setselectedOption] = useState("")
    const [CountNoOfOption, setCountNoOfOption] = useState(1)
    const [reqCount, setreqCount] = useState(false)
    const inputRef = useRef(null);

    const [newNoOfOptions, setnewNoOfOptions] = useState(0);

    const descriptionRef = useRef()
    const [description, setdescription] = useState("")

    const onChnageDescription = (e) => {
        setdescription(e.target.value);
    }

    useEffect(() => {
        if (descriptionRef && descriptionRef.current) {
            descriptionRef.current.style.height = "0px";
            const descHeight = descriptionRef.current.scrollHeight;
            if(descHeight>100)
            {
                descriptionRef.current.style.height = descHeight + "px";
            }
            else
            {
                descriptionRef.current.style.height = "100px";
            }
          }
    }, [description])
    

    var listOptions = ['option1', 'option2', 'option3', 'option4', 'option5',
        'option6', 'option7', 'option8', 'option9', 'option10',
        'option11', 'option12', 'option13', 'option14', 'option15',
        'option16', 'option17', 'option18', 'option19', 'option20',
        'option21', 'option22', 'option23', 'option24', 'option25'];

    const HandleHeaderNameDisability = () => {
        setdisableHeaderName(false);
        setTimeout(() => {
            inputRef.current.focus()
        }, 0);
    }

    const handleSelection = (e) => {
        setselectedOption(e.target.value);
        let optselcted = e.target.value;
        if (optselcted === "radio") {
            setCountNoOfOption(4);
            setreqCount(true);
        }
        else if (optselcted === "check") {
            setCountNoOfOption(4);
            setreqCount(true);
        }
        else {
            setCountNoOfOption(1);
            setreqCount(false);
        }
    }

    const textRef = React.useRef();
  const [value, setValue] = React.useState();
  const onChnage = (event) => {
    setValue(event.target.value);
  };
  React.useEffect(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = "0px";
      const taHeight = textRef.current.scrollHeight;
      textRef.current.style.height = taHeight + "px";
    }
  }, [value]);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='headinggroup'>
                        <h2>{headerName}</h2>
                    </div>
                </div>
                <br />
                <div>
                    <div className='form-group' onClick={HandleHeaderNameDisability}>
                        <input className='form-control' placeholder='Survey Form Name' disabled={disableHeaderName} value={headerName} ref={inputRef}
                            onBlur={() => { setdisableHeaderName(true) }}
                            onChange={(e) => { setheaderName(e.target.value) }} required />
                    </div>
                    <br />
                    <div className='fomr-group'>
                        <textarea className='form-control description' ref={descriptionRef}
                        onChange={onChnageDescription}  placeholder='Enter the description of the Survey'>
                            {description}
                        </textarea>
                    </div>
                </div>
                <br />
                <div className='addquestionbut'>
                    <button><i className="fa fa-plus" aria-hidden="true"></i> Add Question</button>
                </div>
                <br />
                <div>
                    <div className='questionbox'>
                        <textarea className='questionName' placeholder='Enter Question'></textarea>
                        {/* <div>
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
                        </div> */}
                    </div>
                </div>
                
                <div>
                    {
                        reqCount ?
                            <div className='form-group'>
                                <label>Enter the no of options needs to be Inserted</label>
                                <input type="number" className='form-control'
                                    value={CountNoOfOption} onChange={(e) => { setCountNoOfOption(e.target.value) }} />
                            </div>
                            : ""
                    }
                </div>
                <div>
                    {
                        [...Array(CountNoOfOption)].map((e, i) => {
                            return <div>
                                <label></label>
                                <input type={selectedOption} placeholder={selectedOption} />
                            </div>
                        })
                    }
                </div>
                <textarea className="form-control" ref={textRef} onChange={onChnage}>
        {value}
      </textarea>
                {/* <div>
                    <div>
                        <input />
                        <div>
                            <input type="radio" ></input>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
