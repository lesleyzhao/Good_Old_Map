import './AuthForm.css'
import AuthHeader from '../../components/form/authHeader'
import FormInput from '../../components/form/formInput'
import FormBtn from '../../components/form/formBtn'
const AuthForm = (props) => {
  // attributes: header, inputFields, handleClick
  // optional: message, btnValue
  return(
    <>
      <AuthHeader header={props?.header} message={props?.message}/>
      <form>
        <FormInputs inputFields={props.inputFields}/>
        <FormBtn value={props?.btnValue} handleClick={props.handleClick}/>
      </form>
    </>
  )
}

const FormInputs = (props) => {
  return props?.inputFields?.map(field => {
    return <FormInput id={field} placeholder={field} key ={field}/>
  })
}

export default AuthForm