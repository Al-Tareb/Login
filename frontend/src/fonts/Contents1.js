import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BlogCard from "../component/BlogSection/BlogCard";
import BlogTitle from "../component/BlogSection/BlogTitle";
import BlogTopic from "../component/BlogSection/BlogTopic";
import OrderService from "../component/OrderService/OrderService";
import UsersData from "../views/UsersData"
import Logout from "../component/Navbar/Logout"

const Contents1 = props =>{
  const [firstName, setFirstName] = useState("");
  const [brandPhoto, setBrandPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contents, setContents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  
    

  useEffect(() => {
    const fetchUserData = async () => {
        const settings = {
            credentials: "include"
        }
        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}`, settings);
        const parsedRes = await response.json();
        try {
            if (response.ok) {
                console.log("Server response", parsedRes);
                setFirstName(parsedRes.firstName);
                setContents(parsedRes.contents);
                setIsAdmin(parsedRes.isAdmin);
            } else {
                throw new Error(parsedRes.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }

    fetchUserData();
}, [props.currentUserId])


const updateData = event => {
  switch (event.target.name) {
      case "brandPhoto":
        setBrandPhoto(event.target.value);
          break;
      case "title":
        setTitle(event.target.value);
          break;
      case "description":
        setDescription(event.target.value);
          break;
      default:
          break;
  }
}


const submitContent = async event => {
  event.preventDefault();
  const newContent = {
    brandPhoto: brandPhoto,
    title: title,
    description: description
  }
  const settings = {
      method: "POST",
      body: JSON.stringify(newContent),
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + props.token
      },
      credentials: "include"
  }
  const response = await fetch(process.env.REACT_APP_SERVER_URL + `/contents`, settings);
  const parsedRes = await response.json();

  try {
      if (response.ok) {
          const settings = {
              method: "PATCH",
              body: JSON.stringify({ id: parsedRes.id }),
              headers: {
                  "Content-Type": "application/json",
                
              },
              credentials: "include"
          }
          const secondResponse = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}/contents`, settings);
          const secondParsedRes = await secondResponse.json();

       
          if (secondResponse.ok) {
              console.log("Add Content server response", secondParsedRes.contents);
              setContents(secondParsedRes.contents);
              setBrandPhoto("");
              setTitle("");
              setDescription("");
          } else {
              throw new Error(secondParsedRes.message);    
          }
      } else {
          throw new Error(parsedRes.message);
      }
  } catch (err) {
      alert(err.message);
  }
}

const deleteAllContents = async event => {
  const settings = {
      method: "DELETE",
      credentials: "include"
  }

  const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}/contents`, settings);
  const parsedRes = await response.json();
  try {
      if (response.ok) {
          setContents(parsedRes);
      } else {
          throw new Error(parsedRes.message);
      }
  } catch (err) {
      alert(err.message);
  }
}


const deleteOneContent = async event => {
  const contentId = event.target.parentElement.id;
  const settings = {
      method: "DELETE",
      credentials: "include"
  }
  const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${props.currentUserId}/contents/${contentId}`, settings);
  const parsedRes = await response.json();

  try {
      if (response.ok) {
          console.log("Delete content response:", parsedRes.contents);
          setContents(parsedRes.contents);
      } else {
          throw new Error(parsedRes.message);
      }
  } catch (err) {
      alert(err.message);
  }
}
















    return(
        <>
        <Router>
            <BlogTitle />
            <BlogTopic />
            






        <div>
            <h2 id="greeting">Welcome {firstName}!</h2>
            <Logout logout={props.logout} />
            { isAdmin && <UsersData currentUserId={props.currentUserId} token={props.token}/> }
            <h1>Add an Content to the Collection!</h1>

            <form onSubmit={submitContent}>
                <div>
                    <label>Band</label>
                    <input name="brandPhoto" onChange={updateData} value={brandPhoto} />
                </div>
                <div>
                    <label>Title</label>
                    <input name="title" onChange={updateData} value={title} />
                </div>
                <div>
                    <label>Year</label>
                    <input name="description" onChange={updateData} value={description} />
                </div>
                <button>Submit Album</button>
            </form>
            <button onClick={deleteAllContents}>Delete all albums!</button>

            <div>
                <h2>Current Albums</h2>
                <ul>
                    {
                        contents.map(content => {
                            return <li key={content._id} id={content._id}>{content.brandPhoto} by {content.title} ({content.description})
                            <span onClick={deleteOneContent}>X</span>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>








            <OrderService />
        </Router>
        </>
    )
}
 export default Contents1