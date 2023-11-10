import ArtItem from "../../components/art/ArtItem";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottomSheet } from 'react-spring-bottom-sheet'
import axiosProvider from "../../util/api/axios"

const PopupSearch = (props) => {
  // setFoundData, foundData
  const [arts, setArts] = useState([])
  const [open, setOpen] = useState(false)
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
          "/getArts",
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
  
  const handleArtItemClick = (artId) => {
    // Navigate to the art information page
    navigate("/info", { state: { from: location.pathname } });
  };

  const updateFavorites = (artId, newFavoritedState) => {
    setArts(prevArts => prevArts.map(art => {
      if (art.id === artId) {
        return { ...art, inFavList: newFavoritedState };
      }
      return art;
    }));
  };
  
  // handle close
  useEffect(() => {
    if (props?.foundData.search) setOpen(true)
    else setOpen(false)
  }, [props?.foundData])

  const handleClosePopup = (evt) => {
    props?.setFoundData(prev => ({
      ...prev,
      search: false
    }))
    setOpen(false);
  }

  return (
    <>
      <BottomSheet
        className="relative z-[2000] mx-auto"
        open={open}
        onDismiss={handleClosePopup}
        snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight * 0.25]}
        defaultSnap={({ snapPoints }) =>
          Math.min(...snapPoints)}
          header = {
          <>
            <div className="mt-2"/>
            <img className="w-2 mt-2 top-2 right-4 absolute" src="/close.png" alt="x" onClick={handleClosePopup} />
            <p>time, location</p>
            {/* <p>{props?.foundData.location}, {props?.foundData.time}</p> */}
          </>
        }
        blocking={false}>

        <div className="flex flex-row gap-8 overflow-scroll p-8">
          {arts.map((art) => (
            <div key={art.id} onClick={() => handleArtItemClick(art.id)}>
              <div>
                <ArtItem art={art} updateFavorites={updateFavorites} />
              </div>
            </div>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}

export default PopupSearch