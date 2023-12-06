import React, { useState, useEffect } from 'react';
import { useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from "../../components/common/navBar"
import LeftBtn from "../../components/common/leftBtn"
import PopupContent from './popupContent';
import ProfilePic from "../../components/user/profilePic"
import PopupUserPic from "./popupUserPic";


const AccountWithLogin = (props) => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('')
  // json content: popup data, null: close popup
  const [currentActionData, setCurrentActionData] = useState(null);
  const [showUserProfile,  setShowUserProfile] = useState(null);

  // Initialize username and email from localStorage
  const storedUserData = JSON.parse(localStorage.getItem('user') || '{}');
  const [username, setUsername] = useState(storedUserData.name || 'John Doe');
  const [email, setEmail] = useState(storedUserData.email || 'Asdfasdfasdf@nyu.edu');
  // console.log(storedUserData.email)

  // Set username and email on the screen
  useEffect(() => {
    const userDataString =  localStorage.getItem('user'); 
    const userData = JSON.parse(userDataString || '{}'); // Parse JSON string

    setUsername(userData.name || 'John Doe');
    setEmail(userData.email || "Asdfasdfasdf@nyu.edu")
  }, []);


  const getFormData = () => {
    const requestData = {}
    const formData = new FormData(formRef.current)
    console.log("Form data:", requestData);
    formData.forEach((val, key) => {
      requestData[key] = val
      // throw failure on empty input slots
      if (!val) throw {requestMessage:"Please fill in all input slots"}
    })
    return requestData
  }

  const closePopup = () => {
    setCurrentActionData(null)
    setMessage("")
  }

  //All PopupContent data
  const formData = {
    "login":{
        link: "Login",
        title: "Login"
    },
    "register":{
        link: "Register",
        title: "Register"
    }
  }

  const handleOptionClick = (key) => {
    if (key === "login") {
      navigate("/login"); 
    } else if (key == "register"){
        navigate("/register");
    }
    else {
      setCurrentActionData(formData[key]);
    }
  };

  const handleClose = (evt) => {
    if(evt.target.classList.contains("popupBackground")) closePopup()
  }
  
  const togglePopup = (evt) => {
    if (!showUserProfile) setShowUserProfile("userpic")
    else setShowUserProfile(null)
    setCurrentActionData(null)
  }

  console.log("Component render, current username:", username);
  //Return the AccountEdit component
  return (
    <>
    <div className="flex flex-col">
      <NavBar relative="1">
        <LeftBtn />
      </NavBar>

      <div className="w-[80%] max-w-[30rem] mx-auto">
        <div className='w-full flex mb-4'>
          <div className="flex flex-col items-center p-4 m-auto">
            <div onClick={togglePopup} className="w-24 h-24">
              <ProfilePic pic={props.pic ?? "https://picsum.photos/200"}/>
            </div>
            <div className="text-center">
              <h2>{username}</h2>
              <span className="text-gray-400">{email}</span>
            </div>
          </div>
        </div>
        <h3 className='py-1'>Privacy</h3>
        {Object.keys(formData).map((key, i) => {
          return (
            <div className='w-full p-2 border-b border-navyBlue hover:rounded-md hover:border-none hover:bg-white hover:cursor-pointer' key={i}>
              <p onClick={() => handleOptionClick(key)}>{formData[key]["link"]}</p>
            </div>
          )
          }
        )}

        {currentActionData &&
          <form ref = {formRef}>
            <PopupContent 
              message={message}
              title={currentActionData.title}
              inputs={currentActionData.inputs}
              buttons={currentActionData.buttons}
              handleClick = {handleClose}
            />
          </form>
          }
        {showUserProfile && 
          <div onClick={togglePopup}
            className='popupBackground fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
            <PopupUserPic src={props?.pic ?? "https://picsum.photos/200"}/>
          </div>
          }
      </div>
    </div>
    </>
  );
};

export default AccountWithLogin;

