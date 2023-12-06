const FormBtn = (props) => {
  //attribute: value, handleClick
  return (
    <div className="w-full py-2">
      <button className="rounded-lg py-2 w-full
      border-solid border-0 border-navyBlue bg-transparent text-navyBlue
      hover:cursor-pointer hover:bg-navyBlue hover:text-beige1
      active:cursor-pointer active:bg-transparent active:text-navyBlue"
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
          <div className="w-full py-2" key={i}>
            <button className="rounded-lg py-2 w-full
            border-solid border-0 border-navyBlue bg-transparent text-navyBlue
            hover:cursor-pointer hover:bg-navyBlue hover:text-beige1
            active:cursor-pointer active:bg-transparent active:text-navyBlue"
            onClick={props?.handleClick}>
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