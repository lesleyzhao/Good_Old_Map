import React, { useState, useEffect } from 'react';
import { useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from "../../components/common/navBar"
import LeftBtn from "../../components/icon/leftBtn"
import PopupForm from './popupForm';
import ProfilePic from "../../components/user/profilePic"
import PopupUserPic from "./popupUserPic";
import axiosProvider from '../../util/api/axios';


const AccountEdit = (props) => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  // Form error message
  const [message, setMessage] = useState('')
  // Form display
  const [currentActionData, setCurrentActionData] = useState(null); // json content: popup data, null: close popup
  // User profile pic display
  const [showUserProfile,  setShowUserProfile] = useState(null);
  // User info display
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // Initialize username and email from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUsername(userData.name);
    setEmail(userData.email);
  }, []);

  // Read input data to json
  const getFormData = () => {
    const requestData = {}
    const formData = new FormData(formRef.current)
    // console.log("Form data:", requestData);
    formData.forEach((val, key) => {
      requestData[key] = val
      // throw failure on empty input slots
      if (!val) throw {requestMessage:"Please fill in all input slots"}
    })
    return requestData
  }

  // Close popup
  const closePopup = () => {
    setCurrentActionData(null)
    setMessage("")
  }

  // click to close popup
  const handleClose = (evt) => {
    evt.preventDefault()
    closePopup()
  }

  // click to toggle avatar popup
  const toggleUserProfile = (evt) => {
    if (!showUserProfile) setShowUserProfile("userpic")
    else setShowUserProfile(null)
    setCurrentActionData(null)
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

      if (!response?.data?.user) throw "Error"

      setUsername(response.data.user.name);
      localStorage.setItem('user', JSON.stringify(response.data.user))
      // localStorage.setItem('username', response.data.user.name);

      closePopup()

    } catch (error) {
      const errorMessage = error?.requestMessage || error.response?.data?.message || 'Change failed, please try again.';
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

      if (!response?.data?.user) throw "Error"

      setEmail(response.data.user.email);
      localStorage.setItem('user', JSON.stringify(response.data.user))

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
        throw {requestMessage: "Your old password does not match."}
      
      delete requestData["confirmPassword"]
      const response = await axiosProvider.patch(
        "/resetpassword",
        requestData
      )

      if (!response?.data?.user) throw "Error"

      setMessage(response.data.message)

      closePopup()
    } catch (error) {
      const errorMessage = error?.requestMessage || error.response?.data?.message || 'Change failed, please try again.';
      setMessage(errorMessage);
    }
  }

  // Finished: logout user
  const confirmLogOutAccount = async (evt) => {
    // Clear all local storage data
    localStorage.clear();
    navigate("/", { state: { from: location.pathname } });
  }

  // Finished: delete account double check
  const deleteAccount = (evt) => {
    setCurrentActionData(confirmDelAccount)
  }

  // Finished: rout "/delaccount"
  const handleDelAccount = async (evt) => {
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

  // All PopupForm data
  const formData = {
    "changeUsername": {
      link: "Change Username",
      title: "Change Username",
      inputs: [{id:"newUsername", name:"newUsername", type:"text", placeholder:"new username"}],
      buttons: [{value:"Discard", handleClick: handleClose, shade: "light"},
                {value:"Confirm", handleClick: confirmChangeUsername}],
    },
    "changeEmail": {
      link: "Change Email",
      title: "Change Email",
      inputs: [{id:"newEmail", name:"newEmail", type:"text", placeholder:"new email"},
                {id:"password", name:"password", type:"password", placeholder:"password"}],
      buttons: [{value:"Discard", handleClick: handleClose, shade: "light"},
                {value:"Confirm", handleClick: confirmResetEmail}],
    },
    "changePassword": {
      link: "Change Password",
      title: "Change Password",
      inputs: [{id:"oldPassword", name:"oldPassword", type:"password", placeholder:"old password"},
                {id:"confirmPassword", name:"confirmPassword", type:"password", placeholder:"confirm password"},
                {id:"newPassword", name:"newPassword", type:"password", placeholder:"new password"}],
      buttons: [{value:"Discard", handleClick: handleClose, shade: "light"},
                {value:"Confirm", handleClick: confirmResetPassword}],
    },
    "logout": {
      link: "Log Out",
      title: "Log out of this account",
      buttons: [{value:"Confirm", handleClick: confirmLogOutAccount, shade: "light"},
                {value:"Discard", handleClick: handleClose}],
    },
    "deleteAccount": {
      link: "Delete Account",
      title: "You will not be able to recover this account",
      buttons: [{value:"Confirm", handleClick: deleteAccount, shade: "light"},
                {value:"Discard", handleClick: handleClose}],
    }
  }

  // Form to double check for misclick when deleting accounut
  const confirmDelAccount = {
    title: "This account will be gone...",
    buttons: [{value:"Confirm", handleClick: handleDelAccount, shade: "light"},
              {value:"Discard", handleClick: handleClose}],
  }

  // console.log("Component render, current username:", username);

  // Return the AccountEdit component
  return (
    <>
    <div className="flex flex-col">
      <NavBar relative="1">
        <LeftBtn />
      </NavBar>

      <div className="w-[80%] max-w-[30rem] mx-auto">
        <div className='w-full flex mb-4'>
          <div className="flex flex-col items-center p-4 m-auto">
            <div onClick={toggleUserProfile} className="w-24 h-24">
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
            <PopupForm 
              message={message}
              title={currentActionData.title}
              inputs={currentActionData.inputs}
              buttons={currentActionData.buttons}
              handleClick = {handleClose}
            />
          </form>
        }

        {showUserProfile && 
          <div onClick={toggleUserProfile}
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

