import { useLocation, useNavigate } from "react-router-dom";

const LeftBtn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // naviagte to previous page via state={from: pathName} property passed to the Link
  const handleClick = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    navigate(location?.state?.from, { state: { from: location.pathname } });
  }
  return (
    <>
      <img className="w-7 h-7 hover:cursor-pointer" src="/leftbtn.png" alt="leftbtn" onClick={handleClick}/>
    </>
  )
}

export default LeftBtn
