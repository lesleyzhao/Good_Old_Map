const LeftBtn = () => {
  const handleClick = (evt) => {
    evt.stopPropagation();

  }
  return (
    <>
    <img className="w-11 hover:cursor-pointer" src="/leftbtn.png" alt="leftbtn" onClick={handleClick}/>
    </>
  )
}

export default LeftBtn
