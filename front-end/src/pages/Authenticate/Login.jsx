import { useState, useRef } from 'react';
import AuthHeader from './authHeader';
import PopupContent from '../Account/popupContent';
import PageLink from '../../components/common/pageLink';
import { FormInputs } from '../../components/form/formInput';
import FormBtn from '../../components/form/formBtn';
import { useNavigate } from 'react-router-dom';
import axiosProvider from '../../util/api/axios';

const Login = () => {
  const [loginMessage, setLoginMessage] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const fields = ["email", "password"];
  const formRef = useRef(null);
  const popupFormRef = useRef(null); 
  const [currentActionData, setCurrentActionData] = useState(null);
  const navigate = useNavigate();

  const closePopup = () => {
    setCurrentActionData(null);
    setPopupMessage("");
  };

  const handleLogin = async (evt) => {
    evt.preventDefault(); // Prevents the default form submission behavior
  
    const formData = new FormData(formRef.current);
    const email = formData.get('email'); // Extracts the email from the form data
    const password = formData.get('password'); // Extracts the password from the form data
  
    // Checks if both email and password fields are filled
    if (!email || !password) {
      setLoginMessage("Please fill in all input slots");
      return;
    }
  
    try {
      // Sends a POST request to the login endpoint with email and password
      const response = await axiosProvider.post("/login", { email, password });
  
      // Stores the token and user data in localStorage upon successful login
      localStorage.setItem('token', response.data.accessToken);
      const userData = {
        uuid: response.data.user.uuid,
        name: response.data.user.name,
        email: response.data.user.email
      };
      localStorage.setItem('user', JSON.stringify(userData));
  
      setLoginMessage("Login successful!"); // Sets a success message
      navigate("/"); // Navigates to the home page or dashboard
    } catch (error) {
      // Sets an error message if the login process fails
      setLoginMessage(error.message || 'Login failed, please try again.');
    }
  };
  

  const handleForgotPassword = async (evt) => {
    const email = popupFormRef.current?.email?.value;
    if (!email) {
      evt.preventDefault()
      setPopupMessage("Please enter your email.");
      return;
    }
    try {
      await axiosProvider.post("http://localhost:3000/forget", { email });
      setPopupMessage("Reset password link sent to your email.");
    } catch (error) {
      setPopupMessage(error.message || 'Error sending reset password link.');
    }
  };

  const forgotPasswordData = {
    title: "Forgot Password",
    inputs: [{id:"email", name:"email", type:"email", placeholder:"Enter your email"}],
    buttons: [
      {value: "Discard", handleClick: closePopup},
      {value: "Submit", handleClick: handleForgotPassword}
    ]
  };

  const handleGuest = (evt) => {
    evt.preventDefault();
    const continueGuest = window.confirm('Guest visit will not save your data, continue?');
    if (continueGuest) {
      navigate("/");
    }
  };


  const handlePopupFormSubmit = (evt) => {
    evt.preventDefault();
    if (currentActionData && currentActionData.buttons[0]) {
      currentActionData.buttons[0].handleClick();
    }
  };

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
            filter: blur(2px); /* Apply the blur effect */
            z-index: -1; /* Ensure it's behind the content */
          }
        `}
       </style>
      <AuthHeader header="Login" message={message}/>
      <form ref={formRef} onSubmit = {handleLogin}>
        <FormInputs fields={fields} />
        <div className='mt-2'>
          <FormBtn type="submit" value="Login" />
          <FormBtn value="Guest Visit" handleClick={handleGuest} />
        </div>
      </form>
      <div className='mt-2'>
        <PageLink to="/register" value="Register" />
        <div className='w-full text-center py-2 underline'>
          <span onClick={() => setCurrentActionData(forgotPasswordData)} style={{ cursor: 'pointer' }}>
            Forgot Password
          </span>
        </div>
        {currentActionData &&
          <form ref={popupFormRef} onSubmit={handlePopupFormSubmit} onClick={(e) => e.stopPropagation()}>
            <PopupContent 
              message={popupMessage}
              title={currentActionData.title}
              inputs={currentActionData.inputs}
              buttons={currentActionData.buttons}
              handleClick={closePopup}
            />
          </form>
        }
      </div>
    </>
  );
};

export default Login;