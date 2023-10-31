import React, { useState, useEffect } from "react";
import AccountLayout from "./AccountLayout";
import { Link } from "react-router-dom";
import PopupLink from '../../components/popup/popupLink';
import axios from "axios"

const Account = () => {
  // parameters: pic, username, email,
  let props = {};
  props.pic = "https://picsum.photos/200"
  // props.username = "John Doe"
  // sprops.email = "jd00001@nyu.edu"

  const [showPopup, setShowPopup] = useState(false);


  const [data, setData] = useState([])
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
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="bg-white rounded-lg shadow-lg p-8 flex items-center">
        <div onClick={togglePopup}>
          <img className="w-32 h-32 rounded-full object-cover cursor-pointer" src={props.pic} alt="profile picture" />
        </div>
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-10" onClick={togglePopup}>
            <div className="bg-white rounded-lg shadow-lg p-8 flex items-center">
              <img className="w-64 h-64 rounded-full object-cover cursor-pointer" src={props.pic} alt="profile picture" />
            </div>
          </div>
        )}
        <div className="ml-8">
          <h1 className="text-2xl font-bold">{data.username}</h1>
          <p className="text-gray-500">{data.email}</p>
          <Link to="edit">
            <button className="bg-white-500 text-black font-bold py-2 px-4 rounded mt-4">
              Edit Account
            </button>
          </Link>
        </div>
      </div>
      <h2 className="text-left"> My Favorite</h2>

      <a href="/favoritelist" className="bg-white rounded-lg shadow-lg p-8 flex items-center mt-8">
        <img className="w-64 h-64 object-cover cursor-pointer" src="https://picsum.photos/500" alt="random photo" />
      </a>
    </div>
  )
}

export default Account;