const FormBtn = (props) => {
  //attribute: value, handleClick
  return (
    <div className="w-full py-2">
      <button className="rounded-lg py-2 w-full
        border-solid border-2 border-navyBlue bg-navyBlue text-beige1
        hover:cursor-pointer
        active:cursor-pointer active:bg-white active:text-navyBlue"
        onClick={props?.handleClick}>
          {props?.value ?? "Submit"}
        </button>
    </div>
  )
}

const FormBtns = (props) =>  {
  /* props: array of object (buttons)
    {"value": "str",
     "handleClick": function
    }
  */
  return (
    props?.buttons?.map((button, i) => {
      if (button?.value === "Discard") {
        return (
          <div className="w-full py-2">
            <button className="rounded-lg py-2 w-full
              border-solid border-2 border-navyBlue bg-white text-navyBlue
              hover:cursor-pointer active:cursor-pointer hover:bg-beige1"
              onClick={button?.handleClick}>
                {button?.value ?? "Submit"}
            </button>
          </div>
        )
      }
      else return(
        <FormBtn handleClick={button?.handleClick} value = {button?.value} key = {i}/>
      )
    })
  )
}

export default FormBtn
export {FormBtns}