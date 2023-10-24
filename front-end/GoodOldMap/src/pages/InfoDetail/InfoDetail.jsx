const InfoDetail = () => {
  // parameters: header, subtitle(string array), parag
  let props = {};
  props.header = "This Is a Header"
  props.subtitle = ["Author: some author", "Time: some time"]
  props.parag = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  "
  return (
    <>
    {/* TODO: add back button, forward button, image */}
      <div className="min-h-screen flex">
        <div className="w-[80%] my-[10%] mx-auto">
          <h1>{props.header}</h1>
          <div className="mt-2">
            {props?.subtitle?.map((subtitle, i) => <h3 key={i}>{subtitle}</h3>)}
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