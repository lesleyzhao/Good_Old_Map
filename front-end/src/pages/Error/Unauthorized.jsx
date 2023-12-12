import PageLink from "../../components/common/pageLink";
const Unauthorized = () => {
  return (
    <>
      <div className="flex">
        <div className="mx-auto mt-[20vh]">
          <h3 className="w-full text-center pb-2">Please login for this feature</h3>
          <PageLink to="/login" value="Let's Login!"/>
        </div>
      </div>
    </>
  )
}
export default Unauthorized;