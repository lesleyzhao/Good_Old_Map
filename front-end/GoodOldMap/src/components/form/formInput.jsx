const FormInput = (props) => {
  //props attributes: id, placeholder
  return (
    <div>
      <input type="text" id={props?.id} placeholder={props?.placeholder}/>
    </div>
  )
  
}

export default FormInput