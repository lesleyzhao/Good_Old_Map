import PageLink from "../../components/common/pageLink"
import { useLocation } from "react-router-dom";

const UserBasicInfo = (props) => {
  // username, email
  const location = useLocation();

  return(
    <>
      <h2>{props.username}</h2>
      <span className="text-gray-400">{props.email}</span>
      {/* <PageLink to="edit" value="Edit Account" from={location.pathname}/> */}
    </>
  )
}

export default UserBasicInfo;