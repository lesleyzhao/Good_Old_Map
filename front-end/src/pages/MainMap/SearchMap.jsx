import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"
import CityList from "../../components/map/CityList"

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

  return( 
    <>
    <div className="px-[10%]">
      <CityList cities={cities} searchData={searchData} setFoundData={setFoundData}/>
    </div>
    </>
  )
}
export default SearchMap