import ProfilePic from "../../pages/Account/profilePic"
const PopupUserPic = (props) => {
  // src
  return(
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg shadow-lg p-8 flex items-center">
        <div className="w-64 h-64">
          <ProfilePic pic={props.src}/>
        </div>
      </div>
    </div>
  )
}

export default PopupUserPic