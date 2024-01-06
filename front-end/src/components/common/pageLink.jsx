import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
const PageLink = (props) => {
  // attributes: to, value
  const location = useLocation();
  return(
    <div className='w-full text-center py-2'>
      <Link 
        to={props.to}
        state={{from: location.pathname}}>
          <span className='underline'>
            {props.value}
          </span>
      </Link>
    </div>
  )
}

export default PageLink;