import "./formInput.css"
import tailwindConfig from "../../../tailwind.config"
const FormInput = (props) => {
  // attributes: id, placeholder
  return (
    <div>
      <input className="w-full"
      type="text" id={props?.id} placeholder={props?.placeholder}/>
    </div>
  )
}

const FormInputs = (props) => {
  // attributes: array of fields or array of objects {id="fieldid", placeholder="displayplaceholder"}
  return props?.fields?.map((field) => {
    return <FormInput 
      id={field?.id ?? field} 
      placeholder={field?.placeholder ?? field} 
      key ={field?.id ?? field}/>
  })
}

export default FormInput
export {FormInputs}