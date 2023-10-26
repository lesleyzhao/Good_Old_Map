import { Link } from 'react-router-dom'

const PageLink = (props) => {
  // attributes: to, value
  // optional: from
  return(
    <div className='w-full text-center py-2 underline'>
      <Link 
        to={props.to}
        state={{from: props.from}}>
        {props.value}
      </Link>
    </div>
  )
}

export default PageLink;