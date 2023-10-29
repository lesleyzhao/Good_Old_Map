import React from 'react';

const Popup = ({ title, children, isOpen, onClose }) => {
    //isOpen determines whether the popup should be displayed.
    //onClose a function that will be called to set the isOpen state to false, closing the popup
    if (!isOpen) return null;

  return (
    <div className="popup-backdrop">
      <div className="popup-box">
        <h2>{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;