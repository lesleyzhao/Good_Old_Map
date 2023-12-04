import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PopupSearch from "./popupSearch";
import TimeRange from '../../components/timeline/TimeRange.jsx';
import { format, setYear, endOfYear } from 'date-fns';

//timeline-related
const getSpecificYear = (year) => setYear(new Date(), year);
const timelineInterval = [getSpecificYear(1900), endOfYear(getSpecificYear(2000))];


const MapLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchPage, setSearchPage] = useState(false) // display search page or not
  const [searchData, setSearchData] = useState("") // content that user typed in bar
  // subject to changes
  // data necessary to search for art object (time & location)
  // {location:[lng, lat] (or city), time: num}
  const [foundData, setFoundData] = useState({location:[],timeRange:[1920, 1940]})
  const [refreshPopup, setRefreshPopup] = useState(0) // change counter to refresh popup, 0 to close popup

  //timeline
  const [selectedInterval, setSelectedInterval] = useState([getSpecificYear(1920), getSpecificYear(1940)]);
  const [error, setError] = useState(false);
  const errorHandler = ({ error }) => setError(error);


  const onChangeCallback = (newInterval) => {
    setSelectedInterval(newInterval);
    setFoundData(prevData => ({
      ...prevData,
      timeRange: [format(newInterval[0], "yyyy"),format(newInterval[1], "yyyy")]
    }));
  };


  useEffect(() => {
    if (location.pathname === "/search") !searchPage && setSearchPage(true)
  }, [])


  // submit search result
  const handleSubmit = (evt) => {
    evt.stopPropagation()
    // send data via react Context to SearchMap
    if (evt.target.value) {
      setSearchData(evt.target.value)
      if (location.pathname === "/") {
        navigate("/search", { state: { from: location.pathname } });
        !searchPage && setSearchPage(true)
      }
    }
    else {
      navigate("/", { state: { from: location.pathname } });
      searchPage && setSearchPage(false)
      setSearchData("")
    }
  }
  
  // navigate back to home page
  const handleClickBack = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    navigate("/", { state: { from: location.pathname } });
    searchPage && setSearchPage(false)
    setRefreshPopup(0)
  }
  // navigate to search page
  const handleClickSearch = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    navigate("/search", { state: { from: location.pathname } });
    !searchPage && setSearchPage(true)
  }

  
  
  return (
    <>
    <div className="h-[calc(100vh-6rem)] flex flex-col relative">

      <div className="h-[12rem]">
        <nav className="fixed py-[2vh] px-[10%] w-full bg-beige1 flex flex-col justify-between">
          <div className="relative w-full my-1">
            <input className={`w-full py-2 pl-10 pr-4 text-left border-solid border-2 border-navyBlue rounded-full placeholder:text-left placeholder:text-gray-400 bg-white`}
              onInput={handleSubmit}
              type="text" id="searchLocation" placeholder="Search for a city name"/>

              <div className="absolute left-1 top-1">
                {searchPage 
                  ? <img className="w-9 hover:cursor-pointer" onClick={handleClickBack} src="/leftbtn.png" alt="leftbtn"/>
                  : <img className="w-9 hover:cursor-pointer" onClick={handleClickSearch} src="/search.png" alt="search"/>}
              </div>
          </div>
          <div className='mt-3 ml-5'>
            <div className="container w-full">
              <div className="info ml-10">
                <span className="text-xs mr-1 mb-0">Selected Interval:</span>
                {selectedInterval.length === 2 && (
                  <span className="text-xs">
                    {format(selectedInterval[0], "yyyy")} - {format(selectedInterval[1], "yyyy")}
                  </span>
                )}
              </div>

              <TimeRange
                error={error}
                ticksNumber={6} 
                selectedInterval={selectedInterval}
                timelineInterval={timelineInterval}
                onUpdateCallback={errorHandler}
                onChangeCallback={onChangeCallback}
                formatTick={ms => format(new Date(ms), 'yyyy')}
              />
            </div>
          </div>
        </nav>
      </div>

      <div className="w-full h-full">
        <Outlet context={[searchData, foundData, setFoundData, setRefreshPopup]}/>
      </div>
      
      <PopupSearch foundData={foundData} refreshPopup={refreshPopup} setRefreshPopup={setRefreshPopup}/>
      
    </div>
    </>
  );
};

export default MapLayout;