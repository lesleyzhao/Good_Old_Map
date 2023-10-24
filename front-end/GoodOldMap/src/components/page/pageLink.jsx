import { Link } from 'react-router-dom'

const PageLink = (props) => {
  // attributes: to, value
  return(
    <div className='w-full text-center py-2'>
      <Link to={props.to} className='underline'>{props.value}</Link>
    </div>
  )
}

export default PageLink;