import "./formBtn.css"
const FormBtn = (props) => {
  //attribute: value, handleClick
  return (
    <div>
      <input className="border-solid border-2 border-black rounded-lg py-2 w-full"
      type="submit" value={props?.value ?? "Submit"} onClick={props?.handleClick}/>
    </div>
  )
}

export default FormBtn