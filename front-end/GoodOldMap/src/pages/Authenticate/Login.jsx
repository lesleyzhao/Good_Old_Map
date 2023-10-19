import './Login.css'
import { Link } from 'react-router-dom'
import AuthHeader from '../../components/form/authHeader'
import FormInput from '../../components/form/formInput'
import FormBtn from '../../components/form/formBtn'
const Login = () => {
  const handleClick = (evt) => {
    evt.preventDefault()
    alert("send data")
  }
  return(
    <div>
      <AuthHeader header="Login" message="username or password is not correct"/>
      <form>
        <FormInput id="username" placeholder="username"/>
        <FormInput id="password" placeholder="password"/>
        <FormBtn value="Sumbit!" handleClick={handleClick}/>
      </form>
      <Link to="/register">Register</Link>
    </div>
  )
}

export default Login