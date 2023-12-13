import React, { useState, useEffect } from 'react';
import { useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import PopupForm from './popupForm';
import ProfilePic from "./profilePic"
import PopupUserPic from "./popupUserPic";
// helper
import axiosProvider, { axiosPrivateProvider } from '../../util/api/axios';
import getFormData from '../../util/hooks/getFormData';

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

  // Toggle avatar popup
  const toggleUserProfile = (evt) => {
    if (!showUserProfile) setShowUserProfile("userpic")
    else setShowUserProfile(null)
    setCurrentActionData(null)
  }

  // Close popup
  const closePopup = (evt) => {
    evt?.preventDefault()
    setCurrentActionData(null)
    setMessage("")
  }

  /** *************************** Form Functions *************************** */
  // Request route /changeusername
  const confirmChangeUsername = async (evt) => {
    evt.preventDefault(); 
    try {
      const requestData = getFormData(formRef)
      const response = await axiosPrivateProvider.patch(
        "/changeusername",
        requestData
      )

      if (!response?.data?.user) throw "Error"

      setUsername(response.data.user.name);
      localStorage.setItem('user', JSON.stringify(response.data.user))

      closePopup()

    } catch (error) {
      const errorMessage = error?.requestMessage || error.response?.data?.message || 'Change failed, please try again.';
      setMessage(errorMessage);
    }
  }

  // Request route /resetemail
  const confirmResetEmail = async (evt) => {
    evt.preventDefault();
    try {
      const requestData = getFormData(formRef)
      const postOptions = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await axiosPrivateProvider.patch(
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

  // Request route /resetpassword
  const confirmResetPassword = async (evt) => {
    evt.preventDefault()
    try {
      const requestData = getFormData(formRef)
      // throw failure on password double check
      if (requestData["oldPassword"] != requestData["confirmPassword"])
        throw {requestMessage: "Your old password does not match."}
      
      delete requestData["confirmPassword"]
      const response = await axiosPrivateProvider.patch(
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

  // Side effect of clicking "Forgot Password" - show message
  const handleClickForgotPassword = () => {
    setMessage("Send password reset link to the email linked to your account.")
  }

  // Request route /forgetpassword
  const handleResetEmail = async (evt) => {
    evt.preventDefault()
    try {
      const requestData = getFormData(formRef)
            
      await axiosProvider.post(
        "/forget", 
        requestData
      )

      // Remdin user to check email
      setCurrentActionData(followupForm["emailSent"])
      setMessage("Reset link sent to your email. Please check your mailbox to continue.");
    } catch (error) {
      const errorMessage = error?.requestMessage || error.response?.data?.message || 'Error sending reset password link.'
      setMessage(errorMessage)
    }
  };
  
  // Logout user
  const confirmLogOutAccount = async (evt) => {
    evt.preventDefault()
    // Clear all local storage data
    localStorage.clear();
    navigate("/", { state: { from: location.pathname } });
  }

  // Double check account deletion
  const deleteAccount = (evt) => {
    evt.preventDefault()
    setCurrentActionData(followupForm["confirmDelAccount"])
  }

  // Request route "/delaccount"
  const handleDelAccount = async (evt) => {
    evt.preventDefault()
    const requestData = {};
    try {
      await axiosPrivateProvider.delete(
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

  // Click link to show popup window and invoke related functions
  const handleClickLink = (evt, key) => {
    evt.preventDefault()
    setCurrentActionData(formData[key])
    if (formData[key]?.handleClick) formData[key]?.handleClick()
  }

  /** *************************** Form Data *************************** */

  // All PopupForm data
  const formData = {
    "changeUsername": {
      link: "Change Username",
      title: "Change Username",
      inputs: [{id:"newUsername", name:"newUsername", type:"text", placeholder:"new username"}],
      buttons: [{value:"Discard", handleClick: closePopup, shade: "light"},
                {value:"Confirm", handleClick: confirmChangeUsername}],
    },
    "changeEmail": {
      link: "Change Email",
      title: "Change Email",
      inputs: [{id:"newEmail", name:"newEmail", type:"text", placeholder:"new email"},
                {id:"password", name:"password", type:"password", placeholder:"password"}],
      buttons: [{value:"Discard", handleClick: closePopup, shade: "light"},
                {value:"Confirm", handleClick: confirmResetEmail}],
    },
    "changePassword": {
      link: "Change Password",
      title: "Change Password",
      inputs: [{id:"oldPassword", name:"oldPassword", type:"password", placeholder:"old password"},
                {id:"confirmPassword", name:"confirmPassword", type:"password", placeholder:"confirm password"},
                {id:"newPassword", name:"newPassword", type:"password", placeholder:"new password"}],
      buttons: [{value:"Discard", handleClick: closePopup, shade: "light"},
                {value:"Confirm", handleClick: confirmResetPassword}],
    },
    "forgotPasswordData": {
      link: "Forgot Password",
      title: "Forgot Password",
      inputs: [{id:"email", name:"email", type:"email", placeholder:"Enter your email"}],
      buttons: [
        {value: "Discard", handleClick: closePopup, shade:"light"},
        {value: "Submit", handleClick: handleResetEmail}],
      handleClick: handleClickForgotPassword
    },
    "logout": {
      link: "Log Out",
      title: "Log out of this account",
      buttons: [{value:"Confirm", handleClick: confirmLogOutAccount, shade: "light"},
                {value:"Discard", handleClick: closePopup}],
    },
    "deleteAccount": {
      link: "Delete Account",
      title: "You will not be able to recover this account",
      buttons: [{value:"Confirm", handleClick: deleteAccount, shade: "light"},
                {value:"Discard", handleClick: closePopup}],
    }
  }

  // Follow-up forms to confrim information
  const followupForm = {
    "confirmDelAccount": { // form to double check for misclick when deleting accounut
      title: "This account will be gone...",
      buttons: [{value:"Confirm", handleClick: handleDelAccount, shade: "light"},
                {value:"Discard", handleClick: closePopup}],
    },
    "emailSent": {
      title: "Email Sent",
      buttons: [{value: "Confirm", handleClick: closePopup}]
    },
  }

  // Return the AccountEdit component
  return (
    <>
    <div className="flex flex-col">
      {/* User Information */}
      <div className="w-[80%] max-w-[30rem] mx-auto mt-10">
        <div className='w-full flex mb-4'>
          <div className="flex flex-col items-center p-4 m-auto">
            <div onClick={toggleUserProfile} className="w-24 h-24">
              <ProfilePic pic={props.pic ?? "https://picsum.photos/200"}/>
            </div>
            <div className="text-center mt-3">
              <h2>{username}</h2>
              <span className="text-gray-400">{email}</span>
            </div>
          </div>
        </div>

        {/* Links and Forms */}
        <h3 className='py-1'>Privacy</h3>
        {Object.keys(formData).map((key, i) => {
          return (
            <div className='w-full p-2 border-b border-navyBlue hover:rounded-md hover:border-none hover:bg-white hover:cursor-pointer' key={i}>
              <p onClick={(evt) => handleClickLink(evt, key)}>{formData[key]["link"]}</p>
            </div>
          )
          }
        )}

        {/* Form Popup */}
        {currentActionData &&
          <form ref = {formRef}>
            <PopupForm 
              message={message}
              title={currentActionData.title}
              inputs={currentActionData.inputs}
              buttons={currentActionData.buttons}
              closePopup = {closePopup}
            />
          </form>
        }

        {/* Avatar Popup */}
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

