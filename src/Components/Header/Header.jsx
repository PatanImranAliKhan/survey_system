import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './header.css'

export default function Header() {

    const [loginStatus, setloginStatus] = useState(false)
    const [username, setusername] = useState("")

    useEffect(() => {
        const user_local_details = JSON.parse(localStorage.getItem('userdetails'));
        console.log(user_local_details);
        if (user_local_details == null || user_local_details == "") {
            setloginStatus(false);
        }
        else {
            setloginStatus(true);
            setusername(user_local_details.username);
        }
    }, [])

    var navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('userdetails');
        setloginStatus(false);
        navigate('/login')
    }


    return (
        <div>
            <div>
                <nav className="navbar navbar-expand-md">
                    <Link className="navbar-brand logo" to="/"><span className="logo-font" style={{ marginLeft: '20px' }}>Survey System</span></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                            <i className="fa fa-bars fa-lg"></i>
                        </span>
                    </button>
                    {
                        loginStatus ?
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/survey_list">Surveys</Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link className="nav-link" to="/create_survey">Quizzes</Link>
                                    </li> */}
                                    <li className="nav-item">
                                        <span className="nav-link" onClick={() => { logout() }}>Logout</span>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link" style={{color: '#000'}}>{username}</span>
                                    </li>
                                </ul>
                            </div>
                            :
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">register</Link>
                                    </li>
                                </ul>
                            </div>
                    }
                </nav>
            </div>
        </div>
    )
}
