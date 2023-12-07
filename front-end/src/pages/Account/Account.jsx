import React, { useState, useEffect } from 'react';
import { useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from "../../components/common/navBar"
import LeftBtn from "../../components/common/leftBtn"
import PopupContent from './popupContent';
import ProfilePic from "../../components/user/profilePic"
import PopupUserPic from "./popupUserPic";
import axiosProvider from '../../util/api/axios';


const AccountEdit = (props) => {
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

  // Finished: route /changeusername
  const confirmChangeUsername = async (evt) => {
    try {
      evt.preventDefault(); 
      const requestData = getFormData()
      const response = await axiosProvider.patch(
        "/changeusername",
        requestData
      )

      if(response?.data?.user){
        setUsername(response.data.user.name);
        const userData = {
          uuid: response.data.user.uuid,
          name: response.data.user.name,
          email: response.data.user.email
        };
        localStorage.setItem('user', JSON.stringify(userData))
        // localStorage.setItem('username', response.data.user.name);
        
      }else{
        console.log("Error!!!!!");
      }
      closePopup()

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Change failed, please try again.';
      setMessage(errorMessage);
    }
  }

  // Finished: route /resetemail
  const confirmResetEmail = async (evt) => {
    try {
      evt.preventDefault();
      const requestData = getFormData()
      const postOptions = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await axiosProvider.patch(
        "/resetemail",
        requestData,
        postOptions
      )

      if(response?.data?.user){
        setEmail(response.data.user.email);
        const userData = {
          uuid: response.data.user.uuid,
          name: response.data.user.name,
          email: response.data.user.email
        };
        localStorage.setItem('user', JSON.stringify(userData))
      }else{
        console.log("Error!!!!!");
      }

      closePopup()
    } catch (error) {
      const errorMessage = error?.requestMessage || error.response?.data?.message || 'Change failed, please try again.';
      setMessage(errorMessage);
    }
  }


  // Finished: route /resetpassword
  const confirmResetPassword = async (evt) => {
    try {
      evt.preventDefault()
      const requestData = getFormData()
      // throw failure on password double check
      if (requestData["oldPassword"] != requestData["confirmPassword"])
        throw {message: "Your old password does not match."}
      
      delete requestData["confirmPassword"]
      const response = await axiosProvider.patch(
        "/resetpassword",
        requestData
      )

      if(response?.data?.user){
        setMessage(response.data.message)
      }else{
        console.log("Error!!!!!");
      }

      closePopup()
    } catch (error) {
      const errorMessage = error?.requestMessage || error.response?.data?.message || 'Change failed, please try again.';
      setMessage(errorMessage);
    }
  }

  // Finished
  const confirmLogOutAccount = async (evt) => {
    // Clear all local storage data
    localStorage.clear();
    navigate("/", { state: { from: location.pathname } });
  }

  // Finished
  const deleteAccount = (evt) => {
    setCurrentActionData(confirmDeleteAccount)
  }

  // Finished
  const confirmDeleteAccount = async (evt) => {
    const requestData = {};
    try {
      await axiosProvider.delete(
        "/delaccount",
        requestData
        )
      localStorage.clear();
      navigate("/", { state: { from: location.pathname } });
    } catch (error) {
      const errorMessage = error?.requestMessage || error.response?.data?.message || 'Change failed, please try again.';
      setMessage(errorMessage);
    }
  }

  //All PopupContent data
  const formData = {
    "changeUsername": {
      link: "Change Username",
      title: "Change Username",
      inputs: [{id:"newUsername", name:"newUsername", type:"text", placeholder:"new username"}],
      buttons: [{value:"Discard", handleClick: closePopup},
                {value:"Confirm", handleClick: confirmChangeUsername}],
    },
    "changeEmail": {
      link: "Change Email",
      title: "Change Email",
      inputs: [{id:"newEmail", name:"newEmail", type:"text", placeholder:"new email"},
                {id:"password", name:"password", type:"password", placeholder:"password"}],
      buttons: [{value:"Discard", handleClick: closePopup},
                {value:"Confirm", handleClick: confirmResetEmail}],
    },
    "changePassword": {
      link: "Change Password",
      title: "Change Password",
      inputs: [{id:"oldPassword", name:"oldPassword", type:"password", placeholder:"old password"},
                {id:"confirmPassword", name:"confirmPassword", type:"password", placeholder:"confirm password"},
                {id:"newPassword", name:"newPassword", type:"password", placeholder:"new password"}],
      buttons: [{value:"Discard", handleClick: closePopup},
                {value:"Confirm", handleClick: confirmResetPassword}],
    },
    "logout": {
      link: "Log Out",
      title: "Log out of this account",
      buttons: [{value:"Confirm", handleClick: confirmLogOutAccount},
                {value:"Discard", handleClick: closePopup}],
    },
    "deleteAccount": {
      link: "Delete Account",
      title: "You will not be able to recover this account",
      buttons: [{value:"Confirm", handleClick: deleteAccount},
                {value:"Discard", handleClick: closePopup}],
    }
  }

  const handleClose = (evt) => {
    if(evt.target.classList.contains("popupBackground")) closePopup()
  }
  
  const togglePopup = (evt) => {
    if (!showUserProfile) setShowUserProfile("userpic")
    else setShowUserProfile(null)
    setCurrentActionData(null)
  }

  // console.log("Component render, current username:", username);

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
              <p onClick={() => setCurrentActionData(formData[key])}>{formData[key]["link"]}</p>
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

export default AccountEdit;

