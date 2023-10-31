import { useOutletContext } from "react-router-dom"
import CityList from "../../components/map/CityList"
import { useEffect } from "react"

const SearchMap = () => {
  const [searchData, ,setFoundData] = useOutletContext()
  useEffect(() => {
    // close popup
    setFoundData(null)
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

  return( 
    <>
    <div className="px-[10%]">
      <CityList cities={cities} searchData={searchData} />
    </div>
    </>
  )
}
export default SearchMap