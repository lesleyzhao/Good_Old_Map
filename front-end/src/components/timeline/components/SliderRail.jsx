import PropTypes from 'prop-types';

// The SliderRail component represents the rail (track) on which the slider handle moves.
export const SliderRail = ({ getRailProps }) => (
  <>
    {/* The outer rail element. It receives props from the parent Slider component. */}
    <div className='react_time_range__rail__outer' {...getRailProps()} />
    {/* The inner rail element, typically styled differently from the outer rail for visual effect. */}
    <div className='react_time_range__rail__inner' />
  </>
)

// PropTypes validation to ensure the component receives the required function prop.
SliderRail.propTypes = {
  getRailProps: PropTypes.func.isRequired // Function to get the necessary props for the rail element.
}

export default SliderRail;
