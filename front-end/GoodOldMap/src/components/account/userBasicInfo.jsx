import PageLink from "../../components/common/pageLink"
import { useLocation } from "react-router-dom";

const UserBasicInfo = (props) => {
  // username, email
  const location = useLocation();

  return(
    <>
      <h2>{props.username}</h2>
      <p className="text-gray-400">{props.email}</p>
      {/* <PageLink to="edit" value="Edit Account" from={location.pathname}/> */}
    </>
  )
}

export default UserBasicInfo;