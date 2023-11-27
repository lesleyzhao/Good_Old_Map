import PropTypes from 'prop-types';
import { format } from 'date-fns';

// The Tick component displays a single tick mark on a timeline.
const Tick = ({ tick, count }) => {
  // Calculate the style for the tick label to position it correctly.
  // marginLeft centers the label, and width ensures it spreads evenly.
  const tickLabelStyle = {
    marginLeft: `${-(100 / count) / 2}%`, // Centers the label under the tick mark.
    width: `${100 / count}%`, // Sets the width based on the total number of ticks.
    left: `${tick.percent}%`, // Positions the label at the correct percentage along the timeline.
  };

  return (
    <>
      {/* The tick marker itself, positioned according to its percentage value */}
      <div className="react_time_range__tick_marker" style={{ left: `${tick.percent}%` }} />
      {/* The label for the tick, displaying the year extracted from the tick's value */}
      <div className="react_time_range__tick_label" style={tickLabelStyle}>
        {format(new Date(tick.value), 'yyyy')} {/* Formatting the tick value (timestamp) to year */}
      </div>
    </>
  );
};

// PropTypes validation to ensure correct props are passed to the component
Tick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired, // Unique identifier for the tick
    value: PropTypes.number.isRequired, // Timestamp value of the tick
    percent: PropTypes.number.isRequired // The percentage position of the tick on the timeline
  }).isRequired,
  count: PropTypes.number.isRequired, // Total number of ticks to be displayed
};

export default Tick;
