import { useOutletContext } from "react-router-dom"
import React, { useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import FormBtn from '../../components/form/formBtn';

const LocationMarker = ({ map }) => {
  const markerRef = useRef(null);
  const infoWindowRef = useRef(null);
  const [setFoundData, setRefreshPopup] = useOutletContext();

  const handleLookupClick = () => {
    console.log('Look up clicked!');
    const position = markerRef.current.getPosition();

    // Updating the shared state with the new position
    setFoundData(prev => ({
      ...prev,
      location: { lat: position.lat(), lng: position.lng() }
    }));
    setRefreshPopup(prev => prev<=0 ? prev-1 : -1)
  };

  useEffect(() => {
    if (!map) return;

    const marker = new window.google.maps.Marker({
      map: map,
      position: map.getCenter(),
      icon: {
        url: "/mapicon.png",
        scaledSize: new window.google.maps.Size(20, 20),
      },
    });

    markerRef.current = marker;

    const infoWindow = new window.google.maps.InfoWindow();
    infoWindowRef.current = infoWindow;

    map.addListener('click', (event) => {
      const pos = event.latLng;
      marker.setPosition(pos);
      infoWindow.setPosition(pos);

      // Render FormBtn to an HTML string
      const formBtnHtml = ReactDOMServer.renderToString(
        <FormBtn value="Look up" handleClick={handleLookupClick} />
      );

      // Create a container div for the HTML content
      const containerDiv = document.createElement('div');
      containerDiv.innerHTML = formBtnHtml;
      containerDiv.querySelector('button').onclick = handleLookupClick;

      // Set the container as the content of the InfoWindow
      infoWindow.setContent(containerDiv);
      infoWindow.open(map, marker);
    });
  }, [map]);

  return null;
};

export default LocationMarker;
