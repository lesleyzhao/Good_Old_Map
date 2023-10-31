import { useOutletContext } from "react-router-dom"
import CityList from "../../components/common/CityList"
import { useState } from "react";


//to be implemented 
const apiKey = '88033a00'; // Replace with your actual API key
const url = `https://api.mockaroo.com/api/types?key=${apiKey}`;

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    return response.json(); // Parse the JSON response
  })
  .then((data) => {
    // Handle the data containing the available types
    console.log(data);
  })
  .catch((error) => {
    // Handle any errors that occurred during the request
    console.error(error);
  });


const [searchData, setSearchData] = useState('');
const SearchMap = () => {
  const searchData = useOutletContext()
  // research search data
  console.log(searchData)

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
      <CityList cities={cities} searchData={searchData}></CityList>
    </div>
    </>
  )
}
export default SearchMap