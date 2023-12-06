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

  const handleCityClick = (evt, city) => {
    evt.stopPropagation()
    // TODO: find the location of city
    setFoundData(prev => ({
      ...prev,
      location: city
    }))
    setRefreshPopup(prev => prev+1)
  };

}
export default SearchMap