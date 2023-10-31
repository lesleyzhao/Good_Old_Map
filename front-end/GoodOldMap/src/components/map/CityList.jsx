const CityList = ({cities, searchData}) => {
  const filteredCities = cities.filter(city => {
    if (searchData) {
      return city.toLowerCase().startsWith(searchData.toLowerCase());
    }
    return false;
  }).slice(0, 4);
  console.log(filteredCities);

  const handleCityClick = (city) => {
  };

  return (
    <div className='overflow-scroll content-center mt-5'>
      <ul>
        {filteredCities.length ?
          filteredCities?.map((city, index) => (
            <li className="border-b border-navyBlue" key={index} onClick={() => handleCityClick(city)}>
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
  );
};

export default CityList;
