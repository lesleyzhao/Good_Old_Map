// import { Link } from "react-router-dom"
import PageLink from "../../components/common/pageLink"
const Error = () => {
  return(
    <>
    <div className="h-screen flex">
      <div className="m-auto">
        <h1>404 Not Found</h1>
        <PageLink to="/" value="Go back to main page"/>
      </div>
    </div>
    </>
  )
}

export default Error