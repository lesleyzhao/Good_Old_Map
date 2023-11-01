function PopupLink(props){
  // props: value, handleClick
  return (
    <>
      <div className='w-full p-2 
        border-b border-navyBlue hover:border-none hover:bg-white hover:cursor-pointer'>
          <p onClick={props?.handleClick}>{props?.value}</p>
      </div>
    </>
  )
}

export default PopupLink;