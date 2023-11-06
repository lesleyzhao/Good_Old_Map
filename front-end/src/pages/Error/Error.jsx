import PageLink from "../../components/common/pageLink"
import { useLocation } from "react-router-dom"
const Error = () => {
  const location = useLocation();
  return(
    <>
      <h1 className="w-full text-center ">404 Not Found</h1>
      <PageLink to="/" value="Go back to main page"/>
      <PageLink to="/info" value="test info" from={location.pathname}/>
    </>
  )
}

export default Error