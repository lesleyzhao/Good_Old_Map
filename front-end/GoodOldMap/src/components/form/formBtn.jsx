const FormBtn = (props) => {
  //props attribute: value
  return (
    <div>
      <input type="submit" value={props?.value ?? "Submit"} />
    </div>
  )
}

export default FormBtn