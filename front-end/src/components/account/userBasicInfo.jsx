const UserBasicInfo = (props) => {
  return(
    <>
      <h2>{props.username}</h2>
      <span className="text-gray-400">{props.email}</span>
    </>
  )
}

export default UserBasicInfo;