import React, { useState, useEffect } from 'react'
import '../authenticate.css'
import { Link } from 'react-router-dom';
import { CheckAdminCred, AuthenticateUser, AuthenticateVolunteer, AuthenticateOrg } from '../Service/AuthenticationService';
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [passworderror, setpassworderror] = useState("")
  const [emailerror, setemailerror] = useState("")
  const [Errormessage, setErrormessage] = useState("")
  const [successmessage, setsuccessmessage] = useState("")

  var navigate = useNavigate();

  useEffect(() => {
    setemail("")
    setpassword("")
    // const data=AuthenticateUser("9492481954")
    // console.log(data);
  }, [])

  const LoginHandler = () => {
    const validateemail = ValidateEmail();
    const validatepwd = ValidatePassword();
    if (validateemail === false || validatepwd === false) {
      setErrormessage("Please check all the fields tharoughly")
      return;
    }
    else {
      AuthenticateTheUser();
    }
  }

  const AuthenticateTheUser = () => {
    setsuccessmessage("")
    setemailerror("")
    setpassworderror("")
    CheckAdminCred(email, password)
      .then((resp) => {
        navigate("/home");
        console.log("admin login");
      })
    console.log(email,password);
    AuthenticateUser(email, password)
      .then((userdetails) => {
        if (userdetails.status !== 200) {
          setErrormessage("Invalid Credentials");
        }
        else {
          if (userdetails.data.status == "Success") {
            setsuccessmessage("Successfully logged in")
            localStorage.setItem('userdetails', JSON.stringify(userdetails.data.details))
            console.log(userdetails.data.details);
            setErrormessage("")
            navigate("/");
          }
          else {
            setErrormessage("Invalid Credentials");
            setsuccessmessage("")
          }
          console.log(userdetails);
        }
      })
      .catch((err) => {
        setErrormessage("Invalid Credentials");
        setsuccessmessage("")
      })
  }

  const ValidateEmail = () => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
      setemailerror("")
      return true;
    }
    setemailerror("You have entered an invalid email address!")
    return false;
  }

  const ValidatePassword = () => {
    let n = password.length;
    if (n < 8) {
      setpassworderror("passwordlength must be atleast 8 alphabets")
      return false;
    }
    return true;
  }


  return (
    <div>
      {
        Errormessage ?
          <div>
            <div className="alert alert-danger">
              {Errormessage}
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
      <div className="container">
        <div className="authform">
          <div className="userlogo">
            <i className="fa fa-user-circle" style={{ fontSize: '60px' }} aria-hidden="true"></i>
          </div>
          <h3 className="heading">Login</h3>
          <div className="main">
            <div className="form-group">
              <input type="email" name="email" placeholder="email" value={email} onChange={(e) => { setemail(e.target.value) }} className="form-control" required />
              {
                emailerror ?
                  <div>
                    <small style={{ color: 'red' }}>{emailerror}</small>
                  </div>
                  : ""}
            </div>
            <br />
            <div className="form-group">
              <input type="password" name="password" placeholder="password" className="form-control" value={password} onChange={(e) => { setpassword(e.target.value) }} required />
              {
                passworderror ?
                  <div>
                    <small style={{ color: 'red' }}>{passworderror}</small>
                  </div>
                  : ""}
            </div>
            <button className="btn btn-primary" type="submit" onClick={() => { LoginHandler() }}>Login</button>
            <p className="already">
              Create a new account: <Link className="anchor" to="/signup" style={{ color: 'blue' }}>Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}