import React, { useState, useEffect } from "react";
import AccountLayout from "./AccountLayout";
import { Link } from "react-router-dom";
import PageLink from "../../components/common/pageLink"
import PopupLink from '../../components/popup/popupLink';
import axios from "axios"
import ProfilePic from "../../components/account/profilePic"
import { useLocation } from "react-router-dom";

const Account = (props) => {
  // parameters: pic, username, email,
  // props.pic = "https://picsum.photos/200"
  // props.username = "John Doe"
  // sprops.email = "jd00001@nyu.edu"

  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([])
  const location = useLocation();
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

  const togglePopup = () => {
    setShowPopup(!showPopup);
  }

  const randomPhoto = "https://picsum.photos/500";

  return(
    <>
      <div className="flex items-center justify-center flex-col">
        <div className="max-w-full flex items-center gap-4 pb-8">
          <div onClick={togglePopup} className="w-30 h-30">
            <ProfilePic pic="https://picsum.photos/200"/>
          </div>
          {showPopup && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-10" onClick={togglePopup}>
                <div className="bg-white rounded-lg shadow-lg p-8 flex items-center">
                  <img className="w-64 h-64 rounded-full object-cover cursor-pointer" src={props.pic} alt="profile picture" />
                </div>
              </div>
            )}
          
          <div className="text-center">
            <h2>{data.username ?? "John Doe"}</h2>
            <p className="text-gray-400">{data.email ?? "Asdfasdfasdf@nyu.edu"}</p>
            <PageLink to="edit" value="Edit Account" from={location.pathname}/>
          </div>
        </div>

        <h2> My Favorite</h2>

        <a href="/favoritelist" className="bg-white rounded-lg shadow-lg px-8 flex items-center mt-2">
          <img className="w-64 h-64 object-cover cursor-pointer" src="https://picsum.photos/500" alt="random photo" />
        </a>
      </div>
    </>
    
  )
}

export default Account;