const ProfilePic = (props) => {
  // props: pic
  return(
    <>
      <img className="h-full w-full rounded-full object-cover cursor-pointer" src={props.pic} alt="profile picture" />
    </>
  )
}

export default ProfilePic