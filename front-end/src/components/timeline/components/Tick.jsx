import PropTypes from 'prop-types';
import { format } from 'date-fns';

const Tick = ({ tick, count }) => {
  const tickLabelStyle = {
    marginLeft: `${-(100 / count) / 2}%`,
    width: `${100 / count}%`,
    left: `${tick.percent}%`,
  };

  return (
    <>
      <div className="react_time_range__tick_marker" style={{ left: `${tick.percent}%` }} />
      <div className="react_time_range__tick_label" style={tickLabelStyle}>
        {format(new Date(tick.value), 'yyyy')}
      </div>
    </>
  );
};

Tick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  count: PropTypes.number.isRequired,
};

export default Tick;
