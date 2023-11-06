import { useState } from 'react'
import PageLink from '../../components/common/pageLink'
import AuthHeader from '../../components/form/authHeader'
import { FormInputs } from '../../components/form/formInput'
import FormBtn from '../../components/form/formBtn'

const Register = () => {
  const [message, setMessage] = useState("")
  const fields = ["username", "email", "password"]
  
  // click to register
  const handleClick = (evt) => {
    evt.preventDefault()
    setMessage("error message if register fails")
  }
  return(
    <>
      <AuthHeader header="Register" message={message}/>
      <form>
        <FormInputs fields={fields}/>
        <div className='mt-2'>
          <FormBtn handleClick={handleClick}/>
        </div>
      </form>
      <div className='mt-2'>
        <PageLink to="/login" value="Login"/>
      </div>
    </>
  )
}

export default Register