import React, { useState } from "react";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const updateData = event => {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  }
  const attemptLogin = async event => {
    event.preventDefault();

    const loginData = {
      username: username,
      password: password
    }

    const settings = {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }
    const response = await fetch(process.env.REACT_APP_SERVER_URL + "/login", settings);
    const parsedRes = await response.json();

    try {
      if (response.ok) {
        props.login(parsedRes.token, parsedRes.id);
      } else {
        throw new Error(parsedRes.message);
      }
    } catch (err) {
      alert(err.message)
      setUsername("");
      setPassword("");
    }
  }
  const updateShowLogin = () => {
    props.setShowLogin(false);
  }

  return (
    <div className="loginPage">
      <h1 className="loginHeader">Login</h1>

      <form className="loginFrame" onSubmit={attemptLogin}>
        <div>
          <label className="userPassLabel">Username</label>
          <input className="loginText" name="username" onChange={updateData} value={username} />
        </div>
        <div>
          <label className=" userPassLabel passLogin">Password    </label>
          <input className="loginTextP " name="password" onChange={updateData} value={password} />
        </div>

        <button className="signIn">Sign In</button>
      </form>

      <button className="notRegister" onClick={updateShowLogin}>Sign Up</button>
    </div>
  )
}

export default Login;