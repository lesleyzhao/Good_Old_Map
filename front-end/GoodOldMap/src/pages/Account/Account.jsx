import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageLink from "../../components/common/pageLink"
import axios from "axios"
import ProfilePic from "../../components/account/profilePic"
import PopupUserPic from "../../components/popup/popupUserPic";
import UserBasicInfo from "../../components/account/userBasicInfo";

const Account = (props) => {
  // parameters: pic, username, email,
  // props.pic = "https://picsum.photos/200"
  // props.username = "John Doe"
  // sprops.email = "jd00001@nyu.edu"

  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([])
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch mock data
    axios.get("https://my.api.mockaroo.com/good_old_map?key=dd3f48f0", {
      headers: {
        "X-API-Key": "dd3f48f0"
      }
    })
      .then(response => {
        setData(response.data[0]);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const togglePopup = (evt) => {
    evt.stopPropagation()
    setShowPopup(!showPopup)
  }
  const handleClickUserInfo = (evt) => {
    evt.stopPropagation()
    navigate("edit", {state:{from: location.pathname}})
  }

  const randomPhoto = "https://picsum.photos/500";

  return(
    <>
      <div className="flex items-center justify-center flex-col">
        <div className="w-full flex items-center gap-4 p-4 
          bg-white rounded-lg shadow-lg">
          <div onClick={togglePopup} className="w-30 h-30">
            <ProfilePic pic={props.pic ?? "https://picsum.photos/200"}/>
          </div>
          <div onClick={handleClickUserInfo} className="text-center">
            <UserBasicInfo 
              username={data.username ?? "John Doe"}
              email={data.email ?? "Asdfasdfasdf@nyu.edu"}
            />
          </div>
        </div>

        <div className="w-full mt-8">
          <h2>My Favorite</h2>
        </div>

        <a href="/favoritelist" className="justify-center w-full bg-white rounded-lg shadow-lg p-4 flex items-center mt-2">
          <img className="w-64 h-64 rounded-lg object-cover cursor-pointer" src="https://picsum.photos/500" alt="random photo" />
        </a>
      </div>

      {showPopup && 
      <div onClick={togglePopup}>
        <PopupUserPic src={props?.pic ?? "https://picsum.photos/200"}/>
      </div>
      }
    </>
    
  )
}

export default Account;