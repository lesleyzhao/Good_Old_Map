import { useState } from 'react'
import AuthHeader from '../../components/form/authHeader'
import PageLink from '../../components/common/pageLink'
import { FormInputs } from '../../components/form/formInput'
import FormBtn from '../../components/form/formBtn'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [message, setMessage] = useState("")
  const fields = ["username", "password"]
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormData(prevState => ({
      ...prevState,
      [name] : value
    }))
  }

  // click to login
  const handleClick = async (evt) => {
    evt.preventDefault();
    try{
      const response = await fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        //credentials:'include'
      });

      const data = await response.json();
      if(response.ok){
        setMessage("Login successful!");
        navigate("/")
      }else{
        setMessage(data.message || 'Login failed, please try again.');
      }
    }catch(error){
      setMessage('An error occurred, please try again.');
    }
  }
  
  // if user click guest visit redirect to main map
  const handleGuest = (evt) => {
    evt.preventDefault()
    // pop up alert: confirm guest visit
    const continueGuest  = window.confirm('Guest visit will not save your data, continue?');
    if (continueGuest) {
      navigate("/");  // Adjust this path as necessary
    }
      
  }

  return(
    <>
      <AuthHeader header="Login" message={message}/>
      <form>
        <FormInputs fields={fields} handleChange={handleChange}/>
        <div className='mt-2'>
          <FormBtn handleClick={handleClick}/>
          <FormBtn value="Guest Visit" handleClick={handleGuest}/>
        </div>
      </form>
      <div className='mt-2'>
        <PageLink to="/register" value="Register"/>
        <PageLink to="/login" value="Forget Password"/>
      </div>
    </>
  )
}

export default Login