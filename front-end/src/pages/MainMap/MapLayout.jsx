import { Outlet } from "react-router-dom";
import { useRef, useState } from "react";
import { format, setYear, endOfYear } from 'date-fns';
import PopupSearch from "./popupSearch";
import TimeRange from '../../components/timeline/TimeRange.jsx';

//timeline-related
const getSpecificYear = (year) => setYear(new Date(), year);
const timelineInterval = [getSpecificYear(1000), endOfYear(getSpecificYear(2020))];

const MapLayout = () => {
  const searchRef = useRef(null)
  // States related to send request to backend
  // Data required to search for art object: {location:[lng, lat], timeRange: [startYear, endYaer], artInfo: "str"}
  const [foundData, setFoundData] = useState({location:[], timeRange:[1920, 1940], artInfo:""})
  // Counter to refresh popup page: 0 - close, positive - search by click, positive - search by type
  const [refreshPopup, setRefreshPopup] = useState(0)
  // Timeline
  const [selectedInterval, setSelectedInterval] = useState([getSpecificYear(1920), getSpecificYear(1940)]);
  const [error, setError] = useState(false);

  // timeline error handler
  const errorHandler = ({ error }) => setError(error);
  
  // change timeline upon user interaction
  const onChangeCallback = (newInterval) => {
    setSelectedInterval(newInterval);
    setFoundData(prevData => ({
      ...prevData,
      timeRange: [format(newInterval[0], "yyyy"),format(newInterval[1], "yyyy")]
    }));
    setRefreshPopup(prev => prev > 0 ? prev+1 : (prev < 0 ? prev-1 : prev));
  };

  // handle search by input bar
  const updateSearch = () => {
    setFoundData(prev => ({
      ...prev,
      artInfo: searchRef.current.value
    }))
    setRefreshPopup(prev => prev<=0 ? prev-1 : -1)
  }
  const handleClickSearch = (evt) => updateSearch()
  const handleEnterKey = (evt) => evt.key == "Enter" ? updateSearch() : ""

  return (
    <>
    {/* height: screen size - bottom nav bar height */}
    <div className="h-[calc(100vh-4vh-1.75rem)] flex flex-col relative">
      <div className="h-[14rem]">
        <nav className="fixed py-[5vh] px-[10%] w-full bg-beige1 flex flex-col justify-between ">
          
          <div className="relative w-full my-1">
            <input className={`w-full py-2 pl-4 pr-10 text-left border-solid border-2 border-navyBlue rounded-full placeholder:text-left placeholder:text-gray-400 bg-white`}
              type="text" id="searchLocation" placeholder="Title/Author" ref={searchRef} onKeyUp={handleEnterKey}/>
              <div className="absolute right-1 top-1">
                <img className="w-9 hover:cursor-pointer" onClick={handleClickSearch} src="/search.png" alt="search"/>
              </div>
          </div>
          
          <div className='mt-1 ml-5'>
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
        <Outlet context={[setFoundData, setRefreshPopup]}/>
      </div>

      <PopupSearch foundData={foundData} refreshPopup={refreshPopup} setRefreshPopup={setRefreshPopup}/>
      
    </div>
    </>
  );
};

export default MapLayout;