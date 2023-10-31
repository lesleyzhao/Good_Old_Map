import Draggable from 'react-draggable';
import { useState } from 'react';

function TimelineBar() {
  const [xPos, setXPos] = useState(0);
  const [year, setYear] = useState(2023);

  const handleDrag = (e, ui) => {
    const parentWidth = e.target.parentNode.parentNode.clientWidth;
    const left = ui.x + 40;
    const xPosPercent = (left / parentWidth) * 100;
    setXPos(xPosPercent);
    document.getElementById('audio-progress-bar').style.width = `${xPosPercent}%`;
    console.log(left);
    
    const calculatedYear = Math.ceil((2023 * (left / parentWidth)));
    setYear(calculatedYear); 
  };

  return (
    <div id="audio-player-container" className='ml-10'>
      <div className="h-audio_progress w-audio_progress bg-pregress rounded-md" id="audio-progress">
        <Draggable axis="x" onDrag={handleDrag} defaultPosition={{ x: xPos, y: 0 }} bounds="parent">
          <div id="draggable-point" className="float-left mt-[2px] mb-[5px]">
            <div id="audio-progress-handle" className="block absolute z-10 mt-[-5px] ml-[30px] w-[14px] h-[14px] border-4 border-timelinePointer transform rotate-45 rounded-full bg-white shadow-[0 1px 6px rgba(0, 0, 0, .2)] cursor-pointer"></div>
          </div>
        </Draggable>
        <div id="audio-progress-bar" className="h-audio_bar bg-timeline rounded-md" style={{ width: `${xPos}%` }}></div>
      </div>
      <div>The current year is {year}</div>
    </div>
  );
}

export default TimelineBar;
