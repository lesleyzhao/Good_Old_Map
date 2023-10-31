import { useOutletContext } from "react-router-dom"
const SearchMap = () => {
  const searchData = useOutletContext()
  // research search data
  console.log(searchData)
  return( 
    <>
    <div className="px-[10%]">
      search map page
    </div>
    </>
  )
}
export default SearchMap