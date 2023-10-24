import { useState } from 'react'
import { redirect } from 'react-router-dom'
import AuthHeader from '../../components/form/authHeader'
import PageLink from '../../components/page/pageLink'
import { FormInputs } from '../../components/form/formInput'
import FormBtn from '../../components/form/formBtn'

const Login = () => {
  const [message, setMessage] = useState("")
  const fields = ["username", "password"]
  // click to login
  const handleClick = (evt) => {
    evt.preventDefault()
    setMessage("error message if login failed")
  }
  // TODO: redirect function not working
  const handleGuest = (evt) => {
    evt.preventDefault()
    redirect("/")
  }
  return(
    <>
    <div className='w-[60%] m-auto'>
      <AuthHeader header="Login" message={message}/>
      <form>
        <FormInputs fields={fields}/>
        <div className='mt-2'>
          <FormBtn handleClick={handleClick}/>
          <FormBtn value="Guest Visit" handleClick={handleGuest}/>
        </div>
      </form>
      <div className='mt-2'>
        <PageLink to="/register" value="Register"/>
        <PageLink to="/login" value="Forget Password"/>
      </div>
      </div>
    </>
  )
}

export default Login