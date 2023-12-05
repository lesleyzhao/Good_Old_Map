import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import axiosProvider from "../../util/api/axios"

const SearchMap = () => {
  const [searchData, ,setFoundData, setRefreshPopup] = useOutletContext();
  const [searchdata, setSearchData] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const response = await axiosProvider.get(`/search`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching search suggestions', error);
      }
    };

    if (searchdata) {
      loadSuggestions();
    } else {
      setSuggestions([]);
    }
    // setRefreshPopup(0)
  }, [searchData]);

  console.log(suggestions);
  const cities = [
    'New York',
    'San Francisco',
    'Los Angeles',
    'Chicago',
    'Seattle',
    'Miami',
    'Beijing',
    'Washington',
    'Sydney',
    'Charlotte'
  ];

  const filteredCities = cities.filter(city => {
    if (searchData) {
      return city.toLowerCase().startsWith(searchData.toLowerCase());
    }
    return false;
  }).slice(0, 4);

  const handleCityClick = (evt, city) => {
    evt.stopPropagation()
    // TODO: find the location of city
    setFoundData(prev => ({
      ...prev,
      location: city
    }))
    setRefreshPopup(prev => prev+1)
  };

  return( 
    <>
    <div className="px-[10%]">
      <div className='overflow-scroll content-center'>
        <ul>
          {filteredCities.length ?
            filteredCities?.map((suggestions, index) => (
              <li className="border-b border-navyBlue" key={index} >
                <div className="p-2 rounded-lg active:bg-white cursor-pointer">
                  {suggestions.location}
                </div>
              </li>
            )) :
            <li className="border-b border-navyBlue p-2 text-gray-400">
              No Cities Found, Try "New York"
            </li>
            }
        </ul>
      </div>
    </div>
    </>
  )
}
export default SearchMap