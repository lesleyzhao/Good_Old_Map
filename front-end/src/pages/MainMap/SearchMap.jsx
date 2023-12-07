import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import axiosProvider from "../../util/api/axios"

const SearchMap = () => {
  const [searchData, ,setFoundData, setRefreshPopup] = useOutletContext();
  const [suggestions, setSuggestions] = useState([]);

  /*
  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const response = await axiosProvider.get(`/searchArts`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching search suggestions', error);
      }
    };

    if (searchData) loadSuggestions();
    else setSuggestions([]);
    // setRefreshPopup(0)
  }, [searchData]);
  */

  // update suggestions on every user input
  useEffect(() => {
    // may add another route to get a list of suggestions
    if (searchData) setSuggestions(["albert irvin"]) // random author
    else setSuggestions([])
  }, [searchData])

  // click on suggestion to fetch art data
  const handleSuggestionClick = (evt, suggestion) => {
    evt.stopPropagation()
    // TODO: find the location of city
    setFoundData(prev => ({
      ...prev,
      artInfo: suggestion
    }))
    setRefreshPopup(prev => prev<=0 ? prev-1 : -1)
  };

  return(
    <>
      <div className="px-[10%]">
        <div className='overflow-scroll content-center'>
          <ul>

            {suggestions.length ?

              suggestions?.map((suggestion, index) => (
                <li className="border-b border-navyBlue" key={index} onClick={(evt) => handleSuggestionClick(evt, suggestion)}>
                  <div className="p-2 rounded-lg active:bg-white cursor-pointer">
                    {suggestion}
                  </div>
                </li>
              )) :

              <li className="border-b border-navyBlue p-2 text-gray-400">
                No suggestion found, try another one
              </li>
            }
              
          </ul>
        </div>
      </div>
    </>
  )
}
export default SearchMap