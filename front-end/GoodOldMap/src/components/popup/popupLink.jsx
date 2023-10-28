function PopupLink(props){
    // props: value, handleClick
    return (
        <>
            <div className='w-full text-center py-2 underline'>
                <p onClick={handleClick}>{props.value}</p>
            </div>
        </>
    )
}

export default PopupLink;