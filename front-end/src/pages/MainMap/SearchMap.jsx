import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"
import CityList from "./cityList"

const SearchMap = () => {
  const [searchData, ,setFoundData] = useOutletContext()
  useEffect(() => {
    // close popup
    setFoundData(perv => ({
      ...perv,
      search: false
    }))
  },[])
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
      location: city,
      search: true
    }))
  };

  return( 
    <>
    <div className="px-[10%]">
      <div className='overflow-scroll content-center'>
        <ul>
          {filteredCities.length ?
            filteredCities?.map((city, index) => (
              <li className="border-b border-navyBlue" key={index} onClick={(evt) => handleCityClick(evt, city)}>
                <div className="p-2 rounded-lg active:bg-white cursor-pointer">
                  {city}
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