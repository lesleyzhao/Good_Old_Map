import React, { useState } from 'react';
import Popup from '../../components/popup/popup';
import PopupLink from '../../components/popup/popupLink';
import PopupContent from '../../components/popup/popupContent';


const AccountEdit = () => {
  // const [isPopupOpen, setPopupOpen] = useState(false);
  // const [PopupContent, setPopupContent] = useState(null);
  const formData = {
    "changeUsername": {
      title: "Change Username",
      inputs: [{id:"newUsername",
                type:"text",
                placeholder:"new username"}],
      buttons: [{value:"Discard", function:""},
                {value:"Confirm", function:""}],
    },
    "changeEmail": {
      title: "Change Email",
      inputs: [],
      buttons: [],
    },
    "forgotPassword": {
      title: "Forget Password",
      inputs: [],
      buttons: [],
    },
    "changePassword": {
      title: "Change Password",
      inputs: [],
      buttons: [],
    },
    "deleteAccount": {

    }
  }

  // const handleAction = (action) => {
  //   switch (action) {
  //     case 'changePassword':
  //       data = {
  //         title: "",
  //         inputs: [{}]
  //       };
  //       break;
  //     case 'changeEmail':
        
  //       break;
  //     case 'forgotPassword':
        
  //       break;
  //     case 'changeUsername':
        
  //       break;
  //     //case 'showWarning':
  //       //fields = ['Email'];
  //     //  break;
  //   }
 
  //   //Set the pop-up content
  //   const content = (
  //     <div>
  //       {/* <FormInputs fields={fields} /> */}

  //     </div>
  //   );
  //   setPopupContent(content);
  //   setPopupOpen(true); // Open the popup window with the new content
  // };

  return (
    <div>
      {/* <PopupLink value="Change Password" handleClick={handleAction('changePassword')}/> */}
      <PopupLink value="Change Email" />
      <PopupContent title={formData["changeUsername"]["title"]} inputs={formData["changeUsername"]["inputs"]} buttons={formData["changeUsername"]["buttons"]}/>
      {/* {isPopupOpen ? 
        <Popup
        title={title}
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}>
        {popupContent}
      </Popup> : ""} */}
    </div>
  );
};

export default AccountEdit;
