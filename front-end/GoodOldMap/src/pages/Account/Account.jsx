import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import ProfilePic from "../../components/account/profilePic"
import PopupUserPic from "../../components/popup/popupUserPic";
import UserBasicInfo from "../../components/account/userBasicInfo";
import Card from "../../components/common/card";

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

  return(
    <>
      <div className="max-w-[20rem] mx-auto mt-5
        flex items-center justify-center flex-col">
        <Card>
          <div className="flex items-center gap-4 w-fit mx-auto">
            <div onClick={togglePopup} className="w-24 h-24">
              <ProfilePic pic={props.pic ?? "https://picsum.photos/200"}/>
            </div>
            <div onClick={handleClickUserInfo} className="text-center hover:cursor-pointer">
              <UserBasicInfo 
                username={data.username ?? "John Doe"}
                email={data.email ?? "Asdfasdfasdf@nyu.edu"}
              />
            </div>
          </div>
        </Card>
        <div className="mt-8 w-full">
          <Card>
            <a href="/favoritelist" className="flex flex-col pb-2">
              <h2 className="mx-auto pb-2">My Favorite</h2>
              <img className="w-64 h-64 mx-auto rounded-lg object-cover cursor-pointer" src="https://picsum.photos/500" alt="random photo" />
            </a>
          </Card>
        </div>
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