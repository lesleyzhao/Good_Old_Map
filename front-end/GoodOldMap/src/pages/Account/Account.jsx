import React from "react"
import AccountLayout from "./AccountLayout";
import { Link } from "react-router-dom";
import PopupLink from '../../components/popup/popupLink';

const Account = () => {
  // parameters: pic, username, email,
  let props = {};
  props.pic = "https://cdn.icon-icons.com/icons2/2645/PNG/512/person_icon_159921.png"
  props.username = "John Doe"
  props.email = "jd00001@nyu.edu"
  
  return(
    <div>    
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Link to="/ChangeProfilePic">
          <img className="w-32 h-32 rounded-full object-cover cursor-pointer" src={props.pic} alt="profile picture" />
          </Link>

        <h1 className="text-2xl font-bold mt-4">{props.username}</h1>
        <p className="text-gray-500">{props.email}</p>
        {/* Add a button that redirects to another place */}
        <Link to="/edit">
          <button className="bg-white-500 text-black font-bold py-2 px-4 rounded mt-4">
          Edit Account
          </button>
        </Link>
        <Link to="/Favorite">
          <button className="bg-white-500 text-black font-bold py-2 px-4 rounded mt-4">
          My Fav
          </button>
        </Link>
      </div>
      
    </div>
  )
}
export default Account
