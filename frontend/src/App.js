import React, { useEffect, useState } from "react";
import Signup from "./views/Signup";
import Login from "./views/Login";
import Products from "./views/Products";
import Header from "./components/Header"
import "./App.css";

const App = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ currentUserId, setCurrentUserId ] = useState("");
    const [ showLogin, setShowLogin ] = useState(true);
    const [ token, setToken ] = useState(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("data"));
        if (data && data.token && data.id && data.expiry) { 
            const tokenExpiry = new Date(data.expiry);
            const now = new Date();
            if (tokenExpiry > now) {
                login(data.token, data.id);
            } else {
                logout();
            }           
        } else {
            logout();
        }
    }, [])

    const login = (token, id) => {
        setToken(token);
        setCurrentUserId(id);
        setIsLoggedIn(true);
    }

    const logout = () => {
        localStorage.removeItem("data");
        setToken(false);
        setCurrentUserId("");
        setIsLoggedIn(false);
        setShowLogin(true);
    }

    const deregister = async () => {
        const settings = {
            method: "DELETE",
            credentials: "include"
        }
        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${currentUserId}`, settings);
        const parsedRes = await response.json();
        try {
            if (response.ok) {
                alert(parsedRes.message);
                setIsLoggedIn(false);
                setShowLogin(true);
                setCurrentUserId("");
            } else {
                throw new Error(parsedRes.message);
            }
        } catch (err) {
            alert(err.message);
        }   
    }

   


return (
    <div>
    {/* <Header /> */}
 { isLoggedIn &&  <Products currentUserId={currentUserId} token={token} logout={logout} deregister={deregister} /> }
{ !isLoggedIn && showLogin &&   <Login setShowLogin={setShowLogin} login={login} /> }
{ !isLoggedIn && !showLogin &&   <Signup setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} login={login} /> }

    </div>
    
   ) 





}

export default App;



