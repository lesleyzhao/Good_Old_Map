import PageLink from "../../components/common/pageLink"
const Error = () => {
  return(
    <>
      <div className="flex">
        <div className="mx-auto mt-[20vh]">
          <h1 className="w-full text-center">404 Not Found</h1>
          <PageLink to="/" value="Go back to main page"/>
        </div>
      </div>
    </>
  )
}

export default Error