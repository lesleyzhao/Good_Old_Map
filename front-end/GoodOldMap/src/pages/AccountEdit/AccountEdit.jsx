import React, { useState } from 'react';
import Popup from '../../components/popup/popup';
import PopupLink from '../../components/popup/popupLink';


const AccountEdit = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  const handleAction = (action) => {
    let fields = []; // This will hold the ids/placeholder names of the inputs to the component FormInputs
    let title = "change";
    
    switch (action) {
      case 'changePassword':
        title = "ch"
        fields = ['Old Password', 'New Password', 'Confirm New Password'];   
        break;
      case 'changeEmail':
        fields = ['Password', 'New Email'];
        break;
      case 'forgotPassword':
        fields = ['Email'];
        break;
      case 'changeUsername':
        fields = ['Email'];
        break;
      //case 'showWarning':
        //fields = ['Email'];
      //  break;
    }
 
    //Set the pop-up content
    const content = (
      <div>
        {/* <FormInputs fields={fields} /> */}

      </div>
    );

    setPopupContent(content);
    setPopupOpen(true); // Open the popup window with the new content
  };

  return (
    <div>
      <PopupLink value="Change Password" handleClick={handleAction('changePassword')}/>
      <PopupLink value="Change Email"/>

      {/* <button onClick={() => handleAction('changePassword')}>
        Change Password
      </button>
      <button onClick={() => handleAction('changeEmail')}>
        Change Email
      </button>
      <button onClick={() => handleAction('changeUsername')}>
        Change Username
      </button>
      <button onClick={() => handleAction('forgotPassword')}>
        Forgot Password
      </button>
      <button onClick={() => handleAction('showWarning')}>
        Delete Account
      </button> */}
      
      {isPopupOpen ? 
        <Popup
        title={title}
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}>
        {popupContent}
      </Popup> : ""}
    </div>
  );
};

export default AccountEdit;
