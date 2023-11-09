import PageLink from "../../components/common/pageLink"
import BottomNavBar from "../../components/common/bottomNavBar";
const Error = () => {
  return(
    <>
      <div className="h-screen flex">
        <div className="mx-auto mt-[20vh]">
          <h1 className="w-full text-center">404 Not Found</h1>
          <PageLink to="/" value="Go back to main page"/>
        </div>
      </div>
      <BottomNavBar />
    </>
  )
}

export default Error