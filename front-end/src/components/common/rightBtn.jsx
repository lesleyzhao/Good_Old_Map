const RightBtn = (props) => {
  return (
    <>
    <img className="w-7 h-7 hover:cursor-pointer" src="/rightbtn.png" alt="rightbtn" onClick={props.handleRightClick}/>
    </>
  )
}

export default RightBtn
