import { useState, useRef } from 'react';
import AuthHeader from './authHeader';
import PopupForm from '../Account/popupForm';
import PageLink from '../../components/common/pageLink';
import { FormInputs } from '../../components/form/formInput';
import FormBtn from '../../components/form/formBtn';
import { useNavigate } from 'react-router-dom';
import axiosProvider from '../../util/api/axios';

const Login = () => {
  const [loginMessage, setLoginMessage] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const formRef = useRef(null);
  const popupFormRef = useRef(null); 
  const [currentActionData, setCurrentActionData] = useState(null);
  const navigate = useNavigate();
  const fields = ["email", "password"];

  // Close popup
  const handleClosePopup = (evt) => {
    evt?.preventDefault()
    setCurrentActionData(null);
    setPopupMessage("");
  }

  const handleLogin = async (evt) => {
    evt.preventDefault(); // Prevents the default form submission behavior
    
    const formData = new FormData(formRef.current);
    const email = formData.get('email'); // Extracts the email from the form data
    const password = formData.get('password'); // Extracts the password from the form data
    
    try {  
      // Checks if both email and password fields are filled
      if (!email || !password) throw {requestMessage: "Please fill in all input slots."}
      
      // Sends a POST request to the login endpoint with email and password
      const response = await axiosProvider.post("/login", { email, password });
  
      // Stores the token and user data in localStorage upon successful login
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
  
      navigate("/"); // Navigates to the home page or dashboard
      handleClosePopup()
    } catch (error) {
      // Sets an error message if the login process fails
      setLoginMessage(error?.requestMessage || error.response?.data?.message || 'Login failed, please try again.');
    }
  };
  
  /* same function as click "Submit" btn, can be removed
  const handlePopupFormSubmit = (evt) => {
    evt.preventDefault();
    if (currentActionData && currentActionData.buttons[0]) {
      currentActionData.buttons[0].handleClick();
    }
  };
  */

  // Click "Forgot Password"
  const handleForgotEmail = (evt) => {
    evt.preventDefault()
    setCurrentActionData(formData["forgotPasswordData"])
    setPopupMessage("Send password reset link to the email linked to your account.")
  }

  // Click "Submit" to reset password
  const handleResetEmail = async (evt) => {
    evt.preventDefault()
    try {
      const email = popupFormRef.current?.email?.value;
      // handle client error: user did not enter email
      if (!email) throw {requestMessage: "Please enter your email."}
      
      await axiosProvider.post("/forget", { email });
      // Remdin user to check email
      setCurrentActionData(formData["emailSent"])
      setPopupMessage("Reset link sent to your email. Please check your mailbox to continue.");
    } catch (error) {
      const errorMessage = error?.requestMessage || error.response?.data?.message || 'Error sending reset password link.'
      setPopupMessage(errorMessage)
    }
  };

  // Click on "Guest Visit"
  const handleGuest = (evt) => {
    evt.preventDefault()
    setCurrentActionData(formData["guestVisit"])
    setPopupMessage("Guest visit will not save your data, continue?")
  };

  // Gest does not want to login
  const handleGuestContiue = (evt) => {
    evt.preventDefault()
    navigate("/")
    handleClosePopup()
  }

  // Popup form data
  const formData = {
    "forgotPasswordData": {
      title: "Forgot Password",
      inputs: [{id:"email", name:"email", type:"email", placeholder:"Enter your email"}],
      buttons: [
        {value: "Discard", handleClick: handleClosePopup, shade:"light"},
        {value: "Submit", handleClick: handleResetEmail}
      ]  
    },
    "emailSent": {
      title: "Email Sent",
      buttons: [{value: "Confirm", handleClick: handleClosePopup}]
    },
    "guestVisit": {
      title: "Continue as guest",
      buttons: [
        {value: "Confirm", handleClick: handleGuestContiue, shade:"light"},
        {value: "Login", handleClick: handleClosePopup}
      ]
    }
  }

  return(
    //<div className='bg-monet-login-pattern bg-cover w-screen h-screen bg-no-repeat'>
    <>
     <style>
     {`
          body::before {
            content: '';
            position: fixed; /* Cover the entire viewport */
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-image: url('/field.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            filter: blur(0px); /* Apply the blur effect */
            z-index: -1; /* Ensure it's behind the content */
          }
        `}
       </style>
      <AuthHeader header="Login" message={loginMessage}/>

      <form ref={formRef} onSubmit = {handleLogin}>
        <FormInputs fields={fields} />
        <div className='mt-2'>
          <FormBtn type="submit" value="Login" />
          <FormBtn value="Guest Visit" handleClick={handleGuest} />
        </div>
      </form>

      <div className='mt-2'>
        <PageLink to="/register" value="Register" />
        <div className='w-full text-center py-2 underline'
          onClick={handleForgotEmail} style={{ cursor: 'pointer' }}>
            Forgot Password
        </div>

        {currentActionData &&
          <form ref={popupFormRef}>
            <PopupForm 
              message={popupMessage}
              title={currentActionData.title}
              inputs={currentActionData.inputs}
              buttons={currentActionData.buttons}
              handleClick={handleClosePopup}
            />
          </form>
        }
      </div>
    </>
  );
};

export default Login;