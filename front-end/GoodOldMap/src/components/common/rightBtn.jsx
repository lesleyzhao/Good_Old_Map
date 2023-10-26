const RightBtn = (props) => {
  return (
    <>
    <img className="w-11 hover:cursor-pointer" src="/rightbtn.png" alt="rightbtn" onClick={props.handleRightClick}/>
    </>
  )
}

export default RightBtn
