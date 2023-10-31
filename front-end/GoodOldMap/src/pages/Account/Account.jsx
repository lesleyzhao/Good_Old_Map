
import { Link } from "react-router-dom";
import axios from "axios"
import React, { useState, useEffect } from "react"

const Account = () => {
  // parameters: pic, username, email,


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



  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Link to="changeProfilePic">
          <img className="w-32 h-32 rounded-full object-cover cursor-pointer" src="https://picsum.photos/500" alt="profile picture" />
        </Link>
        <h1 className="text-2xl font-bold mt-4">{data.username}</h1>
        <p className="text-gray-500">{data.email}</p>
        {/* Add a button that redirects to another place */}
        <Link to="edit">
          <button className="bg-white-500 text-black font-bold py-2 px-4 rounded mt-4">
            Edit Account
          </button>
        </Link>
        <Link to="/favoritelist">
          <button className="bg-white-500 text-black font-bold py-2 px-4 rounded mt-4">
            My Fav
          </button>
        </Link>
      </div>

    </div>
  )
}

export default Account;
