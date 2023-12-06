const LookupBtn = (props) => {
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
 
  export default LookupBtn
