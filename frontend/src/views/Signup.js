import React, { useState } from "react";

const Signup = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("")
  const [email, setEmail] = useState("");

  const updateData = event => {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "firstName":
        setFirstName(event.target.value);
        break;
      case "lastName":
        setLastName(event.target.value);
        break;
      case "companyName":
        setCompanyName(event.target.value);
          break;   
      case "email":
        setEmail(event.target.value);
        break;
      default:
        break;
    }
  }

  
  const signupUser = async event => {
    event.preventDefault();
    const newUser = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
      emailAddress: email
    }
    const settings = {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }
    const response = await fetch(process.env.REACT_APP_SERVER_URL + "/signup", settings);
    const parsedRes = await response.json();
    try {
     
      if (response.ok) {
        
        props.login(parsedRes.token, parsedRes.id);
      } else {
        throw new Error(parsedRes.message);
      }
    } catch (err) {
      alert(err.message);
    }
  }
  const updateShowLogin = () => {
    props.setShowLogin(true);
  }

  return (
    <div className="signupPage">
      <h1 className="signupHeader">Sign Up</h1>

      <form className="signupFrame" onSubmit={signupUser}>
        <div>
          <label className="userN">Username</label>
          <input className="signupText signupTextName " name="username" onChange={updateData} value={username} minLength={3} maxLength={20} />
        </div>
        <div>
          <label className="userP">Password</label>
          <input  className="signupText signupTextPass" name="password" onChange={updateData} value={password} />
        </div>
        <div>
          <label className="userF">First Name</label>
          <input  className="signupText signupTextFirst" name="firstName" onChange={updateData} value={firstName} />
        </div>
        <div>
          <label className="userL">Last Name</label>
          <input  className="signupText signupTextLast" name="lastName" onChange={updateData} value={lastName} />
        </div>
        <div>
          <label className="userCom">Company Name</label>
          <input  className="signupText signupTextCompany" name="companyName" onChange={updateData} value={companyName} />
        </div>
        <div>
          <label className="userEm">Email Address</label>
          <input  className="signupText signupTextEmail" name="email" onChange={updateData} value={email} />
        </div>

        <button className="signUp">Sign UP</button>
      </form>

      <button className="logIn" onClick={updateShowLogin}> Log In</button>
    </div>
  )
}

export default Signup;