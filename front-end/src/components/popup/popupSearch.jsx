import ArtItem from "../art/ArtItem"
import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosProvider from "../../util/api/axios"
const PopupSearch = (props) => {
  // setFoundData, foundData
  const [arts, setArts] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function getData() {
      const postData = {
        location: props?.foundData["location"],
        time: props?.foundData["time"]
      }
      
      // TODO: fix sending two requests at a time
      const postOptions = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try {
        const res = await axiosProvider.post(
          "/getpiece",
          JSON.stringify(postData),
          postOptions
        )
        const retData = res.data;
        setArts(retData)
      } catch (err) {
        console.error(err)
      }
    }
    getData()
  }, [props?.foundData])

  const navigateToDetail = (evt) => {
    evt.preventDefault()
    navigate("/info", {state:{from:location.pathname}});  // Adjust this path as necessary
  }

  const handleClosePopup = (evt) => {
    evt.stopPropagation()
    props?.setFoundData(prev => ({
      ...prev,
      search: false
    }))
  }

  return(
    <>
      <div className="overflow-scroll absolute z-[2000] rounded-lg bottom-0 w-full h-[60vh] bg-beige2">

        <img className="w-4 m-[4%]" src="/close.png" alt="x" onClick={handleClosePopup}/>
          <div className="mx-[10%] items-center rounded-lg h-[calc(60vh-8%-1rem)] overflow-scroll">
            {arts.map(art => 
              <div onClick={navigateToDetail}>
                <ArtItem key={art.id} art={art}/>
              </div>)}
          </div>
      </div>
    </>
  )
}

export default PopupSearch