import ArtItem from "../../components/art/ArtItem";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottomSheet } from 'react-spring-bottom-sheet'
import axiosProvider from "../../util/api/axios"

const PopupSearch = (props) => {
  // foundData, setRefreshPopup, refreshPopup
  const [arts, setArts] = useState([])
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // useEffect(() => {
  //   async function getData() {
  //     const postData = {
  //       location: props?.foundData["location"],
  //       time: props?.foundData["timeRange"]
  //     }
  //     const postOptions = {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }
  //     try {
  //       const res = await axiosProvider.post(
  //         "/getArts",
  //         JSON.stringify(postData),
  //         postOptions
  //       )
  //       const retData = res.data;
  //       setArts(retData)
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }
  //   if (props.refreshPopup) getData()
  // }, [props.refreshPopup])

  useEffect(() => {
    async function getData() {
      const postData = {
        location: props.foundData.location,
        timeRange: props.foundData.timeRange
      };
      const postOptions = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      try {
        const res = await axiosProvider.post(
          "/getArts",
          JSON.stringify(postData),
          postOptions
        );
        const retData = res.data;
        setArts(retData);
      } catch (err) {
        console.error(err);
      }
    }
    if (props.refreshPopup) getData();
  }, [props.refreshPopup, props.foundData]);
  
  const handleArtItemClick = (artId) => {
    // Navigate to the art information page
    navigate("/info", { state: { from: location.pathname } });
  };

  
  // handle close
  useEffect(() => {
    if (props.refreshPopup) setOpen(true)
    else setOpen(false)
  }, [props.refreshPopup])

  const handleClosePopup = (evt) => {
    props.setRefreshPopup(0)
    setOpen(false);
  }

  return (
    <>
      <BottomSheet
        className="relative z-[2000] mx-auto"
        open={open}
        onDismiss={handleClosePopup}
        snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight * 0.25]}
        defaultSnap={({ snapPoints }) => snapPoints[0]}
          header = {
          <>
            <div className="mt-2"/>
            <img className="w-2 mt-2 top-2 right-4 absolute" src="/close.png" alt="x" onClick={handleClosePopup} />
            <p>{props?.foundData["timeRange"][0]} ~ {props?.foundData["timeRange"][1]}</p>
          </>
        }
        blocking={false}>

        <div className="flex flex-row gap-8 overflow-scroll p-8">
          {arts.map((art) => (
            <div key={art.id} onClick={() => handleArtItemClick(art.id)}>
              <div>
                <ArtItem art={art} />
              </div>
            </div>
          ))}
          {/* {arts.map((art, index) => (
          <div key={index} className="art-item">
            <img src={art.url} alt={art.title} />
            <div className="art-details">
              <h3>{art.title}</h3>
              <p>{art.location}</p>
              <p>{art.Date}</p>

            </div>
          </div>
        ))} */}

        </div>
      </BottomSheet>
    </>
  );
}

export default PopupSearch