import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from "../../components/common/navBar"
import LeftBtn from "../../components/common/leftBtn"
import PopupContent from '../../components/popup/popupContent';
import ProfilePic from './profilePic';
import UserBasicInfo from './userBasicInfo';
import PopupUserPic from "../../components/popup/popupUserPic";
import axiosProvider from '../../util/api/axios';

const AccountEdit = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentActionData, setCurrentActionData] = useState(null);
  const [showUserProfile,  setShowUserProfile] = useState(null);

  const discardChange = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    setCurrentActionData(null);
  }
  const confirmChangeUsername = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  }
  const confirmChangeEmail = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  }
  const sentForgetPwEmail = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  }
  const confirmChangePassword = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  }

  const confirmLogOutAccount = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    navigate("/", { state: { from: location.pathname } });
  }

  const deleteAccount = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    setCurrentActionData(confirmDelAccount)
  }
  const confirmDeleteAccount = async (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    try {
      await axiosProvider.post("/delaccount")
      navigate("/", { state: { from: location.pathname } });
    } catch (error) {
      
    }
  }
  //All PopupContent data
  const formData = {
    "changeUsername": {
      link: "Change Username",
      title: "Change Username",
      inputs: [{id:"newUsername", type:"text", placeholder:"new username"}],
      buttons: [{value:"Discard", handleClick: discardChange},
                {value:"Confirm", handleClick: confirmChangeUsername}],
    },
    "changeEmail": {
      link: "Change Email",
      title: "Change Email",
      inputs: [{id:"newEmail", type:"text", placeholder:"new email"},
                {id:"password", type:"password", placeholder:"password"}],
      buttons: [{value:"Discard", handleClick: discardChange},
                {value:"Confirm", handleClick: confirmChangeEmail}],
    },
    "forgotPassword": {
      link: "Forget Password",
      title: "Forget Password",
      inputs: [{id:"email", type:"text", placeholder:"email"}],
      buttons: [{value:"Discard", handleClick: discardChange},
                {value: "Send Email", handleClick: sentForgetPwEmail}],
    },
    "changePassword": {
      link: "Change Password",
      title: "Change Password",
      inputs: [{id:"oldPassword", type:"password", placeholder:"old password"},
                {id:"password", type:"password", placeholder:"password"},
                {id:"confirmPassword", type:"password", placeholder:"confirm password"}],
      buttons: [{value:"Discard", handleClick: discardChange},
                {value:"Confirm", handleClick: confirmChangePassword}],
    },
    "logout": {
      link: "Log Out",
      title: "Log out of this account",
      buttons: [{value:"Confirm", handleClick: confirmLogOutAccount},
                {value:"Discard", handleClick: discardChange}],
    },
    "deleteAccount": {
      link: "Delete Account",
      title: "You will not be able to recover this account",
      buttons: [{value:"Okay", handleClick: deleteAccount},
                {value:"Discard", handleClick: discardChange}],
    }
  }
  const confirmDelAccount = {
    title: "This account will be gone...",
    buttons: [{value:"Confirm", handleClick: confirmDeleteAccount},
              {value:"Discard", handleClick: discardChange}],
  }

  //Function to decide which PopupContent to display
  const handleAction = (key) => {
    setCurrentActionData(formData[key]);
  };

  const handleClose = (evt) => {
    if(evt.target.classList.contains("popupBackground")) setCurrentActionData(null)
  }
  
  const togglePopup = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    if (!showUserProfile) setShowUserProfile("userpic")
    else setShowUserProfile(null)
    setCurrentActionData(null)
  }

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
              <UserBasicInfo 
                username={props.username ?? "John Doe"}
                email={props.email ?? "Asdfasdfasdf@nyu.edu"}
              />
            </div>
          </div>
        </div>
        <h3 className='py-1'>Privacy</h3>
        {Object.keys(formData).map((key, i) => {
          return (
            <div className='w-full p-2  border-b border-navyBlue hover:border-none hover:bg-white hover:cursor-pointer' key={i}>
              <p onClick={() => handleAction(key)}>{formData[key]["link"]}</p>
            </div>
          )
          }
        )}

          {currentActionData &&
            <PopupContent 
              title={currentActionData.title}
              inputs={currentActionData.inputs}
              buttons={currentActionData.buttons}
              handleClick = {handleClose}
            />}
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

