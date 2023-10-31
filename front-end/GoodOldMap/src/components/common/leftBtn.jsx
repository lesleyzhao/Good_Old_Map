import { useLocation, useNavigate } from "react-router-dom";


const LeftBtn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // naviagte to previous page via state={from: pathName} property passed to the Link
  const handleClick = (evt) => {
    evt.stopPropagation();
    // navigate(location?.state?.from);
    window.history.back();
  }
  return (
    <>
      <img className="w-9 hover:cursor-pointer" src="/leftbtn.png" alt="leftbtn" onClick={handleClick}/>

    </>
  )
}

export default LeftBtn
