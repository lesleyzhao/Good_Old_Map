import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
const PageLink = (props) => {
  // attributes: to, value
  const location = useLocation();
  return(
    <div className='w-full text-center py-2 underline'>
      <Link 
        to={props.to}
        state={{from: location.pathname}}>
        {props.value}
      </Link>
    </div>
  )
}

export default PageLink;