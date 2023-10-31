import ProfilePic from "../account/profilePic"
const PopupUserPic = (props) => {
  <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-10" onClick={togglePopup}>
    <div className="bg-white rounded-lg shadow-lg p-8 flex items-center">
      <div className="w-64 h-64">
        <ProfilePic pic={props.pic ?? "https://picsum.photos/200"}/>
      </div>
    </div>
  </div>
}

export default PopupUserPic