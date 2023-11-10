import NavBar from "../../components/common/navBar"
import LeftBtn from "../../components/common/leftBtn"

const InfoDetail = (props) => {
  // parameters: pic, name, subtitle(string array), parag
  const dummyPic = "https://picsum.photos/200"
  const dummyName = "error header"
  const dummySubtitle = ["Author: some author", "Time: some time", "Location: some location"]
  const dummyparag  = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  "
  const handleRightClick = (evt) => {
    evt.stopPropagation();
  }

  return (
    <>
      <div className="flex flex-col">
        <NavBar>
          <LeftBtn />
        </NavBar>
        <div className="max-h-[80vh] max-w-full mx-auto flex">
          <img className="object-contain" src={props.pic ?? dummyPic} alt="picture" />
        </div>
        <div className="w-[80%] mb-[10%] mx-auto max-w-[30rem]">
          <div className="mt-2">
            <h2>{props.name ?? dummyName}</h2>
          </div>
          <div className="mt-2">
            {props?.subsitle ?
              props?.subtitle?.map((subtitle, i) => <p key={i}>{subtitle}</p>) :
              dummySubtitle?.map((subtitle, i) => <p key={i}>{subtitle}</p>)
            }
          </div>
          <div className="mt-4">
            <p>{props.parag ?? dummyparag}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoDetail;