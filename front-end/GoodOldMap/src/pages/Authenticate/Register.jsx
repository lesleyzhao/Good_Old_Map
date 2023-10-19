import './Register.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import AuthHeader from '../../components/form/authHeader'
import { FormInputs } from '../../components/form/formInput'
import FormBtn from '../../components/form/formBtn'

const Register = () => {
  const [message, setMessage] = useState("")
  const fields = ["username", "email", "password"]
  // click to register
  const handleClick = (evt) => {
    evt.preventDefault()
    alert("register")
    setMessage("error message if register fails")
  }
  return(
    <>
    <div>
      <AuthHeader header="Register" message={message}/>
      <form>
        <FormInputs fields={fields}/>
        <FormBtn handleClick={handleClick}/>
      </form>
      <Link to="/login">Login</Link>
      </div>
    </>
  )
}

export default Register