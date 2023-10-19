const FormBtn = (props) => {
  //attribute: value, handleClick
  return (
    <div>
      <input type="submit" value={props?.value ?? "Submit"} onClick={props?.handleClick}/>
    </div>
  )
}

export default FormBtn