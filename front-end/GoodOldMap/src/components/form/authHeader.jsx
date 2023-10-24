const AuthHeader = (props) => {
  // attributes: header
  // optional: message
  return(
    <>
      <div className="w-full text-center min-h-3">
        <h1>{props?.header}</h1>
        <p>{props?.message}</p>
      </div>
    </>
  )
}

export default AuthHeader