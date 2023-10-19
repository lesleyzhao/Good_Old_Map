const AuthHeader = (props) => {
  // attributes: header
  // optional: message
  return(
    <>
      <div>
        <h1>{props?.header}</h1>
        <p>{props?.message}</p>
      </div>
    </>
  )
}

export default AuthHeader