<<<<<<< Updated upstream
const AccountEdit = () => {
  return(
    <>
    edit page
    </>
  )
}

export default AccountEdit
=======
import React, { useState } from 'react';
import PopupLink from '../../components/popup/popupLink';
import PopupContent from '../../components/popup/popupContent';


const AccountEdit = () => {
  const [currentActionData, setCurrentActionData] = useState(null);

  //TO DO for Richard: send data to backend
  const discardChange = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    currentActionData && setCurrentActionData(null);
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
  const confirmDeleteAccount = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
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
      title: "Log Out",
      buttons: [{value:"Discard", handleClick: discardChange},
                {value:"Confirm", handleClick: confirmDeleteAccount}],
    },
    "deleteAccount": {
      link: "Delete Account",
      title: "You will not be able to recover this account",
      buttons: [{value:"Discard", handleClick: discardChange},
                {value:"Confirm", handleClick: confirmDeleteAccount}],
    }
  }
  const formKeys = Object.keys(formData);

  //Function to decide which PopupContent to display
  const handleAction = (key) => {
    const actionData = formData[key];
    try {
      if (!actionData) throw `No data found for action:: ${key}`
      setCurrentActionData(actionData);
    } catch (error) {
      console.error(error)
    }
  };
  const handleClose = (evt) => {
    evt.stopPropagation()
    if(evt.target.classList.contains("popupBackground")) setCurrentActionData(null)
  }
  
  //Return the AccountEdit component
  return (
    <div>
        {/* TO DO: add image profile, add username, add user email */}
        {formKeys.map((key, i) => <PopupLink value={formData[key]["link"]} handleClick={() => handleAction(key)} key={i}/>)}
        {/* TO DO: add logout link below*/}
        {/* <PageLink to={} from={} value={}/> */}

        {currentActionData &&
          <PopupContent 
            title={currentActionData.title}
            inputs={currentActionData.inputs}
            buttons={currentActionData.buttons}
            handleClick = {handleClose}
          />}

    </div>
  );
};

export default AccountEdit;
>>>>>>> Stashed changes
