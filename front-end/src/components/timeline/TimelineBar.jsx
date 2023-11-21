import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

function TimelineBar() {
  const [xPos, setXPos] = useState(0);
  const [year, setYear] = useState(2023);
  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    const audioProgress = document.getElementById('audio-progress');
    if (audioProgress) {
      setParentWidth(audioProgress.clientWidth);
    }
  }, []);

  const handleDrag = (e, ui) => {
    const left = ui.x;
    let xPosPercent = (left / parentWidth) * 100;
    xPosPercent = Math.min(100, Math.max(0, xPosPercent));
    setXPos(xPosPercent);
    document.getElementById('audio-progress-bar').style.width = `${xPosPercent}%`;
    const calculatedYear = Math.round(2023 * (xPosPercent / 100));
    setYear(calculatedYear);
    console.log("left",left);
    console.log(xPosPercent);
  };

  return (
    <div id="audio-player-container" className="">
      <div className="h-[0.5rem] w-full bg-progress rounded-md" id="audio-progress">
        <Draggable axis="x" onDrag={handleDrag} defaultPosition={{ x: 0, y: 0 }} bounds={{ left: 0, right: parentWidth}}>
          <div className="float-left mt-[2px] mb-[5px]">
            <div id="audio-progress-handle" className="block relative z-10 mt-[-5px] w-[14px] h-[14px] border-4 border-timelinePointer transform rotate-45 rounded-full bg-white shadow-[0 1px 6px rgba(0, 0, 0, .2)] cursor-pointer"></div>
          </div>
        </Draggable>
        <div id="audio-progress-bar" className="h-full bg-timeline rounded-md" style={{ width: `${xPos}%` }}></div>
      </div>
      <div>The current year is {year}</div>
    </div>
  );
}

export default TimelineBar;
