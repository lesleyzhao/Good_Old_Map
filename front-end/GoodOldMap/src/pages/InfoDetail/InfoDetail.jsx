import NavBar from "../../components/common/navBar";
import RightBtn from "../../components/common/rightBtn";
import LeftBtn from "../../components/common/leftBtn";
const InfoDetail = () => {
  // parameters: pic, header, subtitle(string array), parag
  let props = {};
  props.pic = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Vincent_van_Gogh_-_Road_with_Cypress_and_Star_-_c._12-15_May_1890.jpg/1200px-Vincent_van_Gogh_-_Road_with_Cypress_and_Star_-_c._12-15_May_1890.jpg"
  props.header = "This Is a Header"
  props.subtitle = ["Author: some author", "Time: some time", "Location: some location"]
  props.parag = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  "

  const handleRightClick = (evt) => {
    evt.stopPropagation();
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar>
          <LeftBtn />
          <RightBtn handleRightClick={handleRightClick}/>
        </NavBar>
        <div className="max-h-[80vh] max-w-full m-auto flex">
          <img className="object-contain" src={props.pic} alt="picture" />
        </div>
        <div className="w-[80%] mb-[10%] mx-auto">
          <div className="mt-2">
            <h2>{props.header}</h2>
          </div>
          <div className="mt-2">
            {props?.subtitle?.map((subtitle, i) => <p key={i}>{subtitle}</p>)}
          </div>
          <div className="mt-4">
            <p>{props.parag}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoDetail;