import { useOutletContext } from "react-router-dom"
import CityList from "../../components/common/CityList"

const SearchMap = () => {
  const [searchData, ,] = useOutletContext()
  const keys = searchData.length > 0 ? searchData[0] : [];
  // research search data
  console.log(keys);

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
      search map page
      <CityList cities={cities} searchData={keys}></CityList>
    </div>
    </>
  )
}
export default SearchMap