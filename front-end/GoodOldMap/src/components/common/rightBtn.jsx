const RightBtn = (props) => {
  return (
    <>
    {/* TODO: width too large for desktop */}
    <img className="w-11 hover:cursor-pointer" src="/rightbtn.png" alt="rightbtn" onClick={props.handleRightClick}/>
    </>
  )
}

export default RightBtn