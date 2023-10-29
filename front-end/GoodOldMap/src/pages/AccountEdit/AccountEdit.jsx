import React, { useState } from 'react';
import PopupLink from '../../components/popup/popupLink';
import PageLink from '../../components/common/pageLink';
import PopupContent from '../../components/popup/popupContent';


const AccountEdit = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [currentActionData, setCurrentActionData] = useState(null);

  //TO DO for Richard: send data to backend
  const discardChangeUsername = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
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
  const discardDeleteAccount = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  }

  //All PopupContent data
  const formData = {
    "changeUsername": {
      title: "Change Username",
      inputs: [{id:"newUsername", type:"text", placeholder:"new username"}],
      buttons: [{value:"Discard", function: discardChangeUsername},
                {value:"Confirm", function: confirmChangeUsername}],
    },
    "changeEmail": {
      title: "Change Email",
      inputs: [{id:"newEmail", type:"text", placeholder:"new email"},
              {id:"password", type:"password", placeholder:"password"}],
      buttons: [{value:"Confirm", function: confirmChangeEmail}],
    },
    "forgotPassword": {
      title: "Forget Password",
      inputs: [{id:"email", type:"text", placeholder:"email"}],
      buttons: [{value: "Send Email", function: sentForgetPwEmail}],
    },
    "changePassword": {
      title: "Change Password",
      inputs: [{id:"oldPassword", type:"password", placeholder:"old password"},
                {id:"password", type:"password", placeholder:"password"},
                {id:"confirmPassword", type:"password", placeholder:"confirm password"}],
      buttons: [{value:"Confirm", function: confirmChangePassword}],
    }
  }
  const deleteAccountData ={
    "deleteAccount": {
    title: "You will not be able to recover this account",
    buttons: [{value:"Discard", function: discardDeleteAccount},
              {value:"Confirm", function: confirmDeleteAccount}],
    }
  }
  const formKeys = Object.keys(formData);

  //Function to decide which PopupContent to display
  const handleAction = (actionKey) => {
    const actionData = actionKey === 'deleteAccount' ? deleteAccountData[actionKey] : formData[actionKey];

    if (!actionData) {
      console.error("No data found for action:", actionKey);
      return;
    }

    setCurrentActionData(actionData);
    setPopupOpen(true); 
  };
  
  //Return the AccountEdit component
  return (
    <div>
        {/* TO DO: add image profile, add username, add user email */}

        {formKeys.map((key, i)  => 
        <PopupLink value={formData[key]["title"]} handleClick={() => handleAction(key)} key={i}/>)}
        <PopupLink value={"Delete Account"} handleClick ={() => handleAction("deleteAccount")}/>

        {/* TO DO: add logout link below*/}
        {/* <PageLink to={} from={} value={}/> */}

        {isPopupOpen && currentActionData && 
        <PopupContent 
          title={currentActionData.title}
          inputs={currentActionData.inputs}
          buttons={currentActionData.buttons}
          onClose = {() => {setPopupOpen(false)}}
        /> }

    </div>
  );
};

export default AccountEdit;
