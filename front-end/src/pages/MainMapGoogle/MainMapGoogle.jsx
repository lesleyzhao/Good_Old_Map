import { useOutletContext } from "react-router-dom"
import FormBtn from '../../components/form/formBtn';
import InfoCard from '../../components/map/InfoCard';
import countries from '../../util/data/countries.json'

import React, { useState, useEffect, useRef } from 'react';
import LocationMarker from '../MainMapGoogle/LocationMarker';

const loadGoogleMapsScript = (callback) => {
  if (window.google) {
    callback();
    return;
  }

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBcllYee9ft1HTD20Z395jqWIzTS_WmTIA&language=en`;
  script.async = true;
  script.defer = true;
  script.onload = () => callback();
  document.head.appendChild(script);
};

const MainMapGoogle = () => {
  const mapRef = useRef(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [map, setMap] = useState(null); // State to store the map instance
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });

  useEffect(() => {
    loadGoogleMapsScript(() => setIsApiLoaded(true));
  }, []);

  useEffect(() => {
    if (isApiLoaded && !window.google) {
      console.error("Google Maps API not loaded");
      return;
    }

    if (isApiLoaded && mapRef.current && !map) {
      const googleMap = new window.google.maps.Map(mapRef.current, {
        center: position,
        zoom: 3,
      });

      setMap(googleMap); // Store the map instance in the state

      const marker = new window.google.maps.Marker({
        position: position,
        map: googleMap,
        icon: {
          url: "/mapicon.png",
          scaledSize: new window.google.maps.Size(30, 30)
        }
      });

      googleMap.addListener('click', (event) => {
        const newPos = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setPosition(newPos);
        marker.setPosition(newPos);
        googleMap.panTo(newPos);
      });
    }
  }, [isApiLoaded, map]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '74vh' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
      {map && <LocationMarker map={map} />}
      <div style={{ position: 'absolute', top: '-3px', left: '10px', zIndex: 2000 }}>
        <div style={{ marginBottom: '5px', width: '200px', fontSize: '0.8rem' }}>
          <InfoCard title="Welcome!" text="Click anywhere on the map to start your European art & music journey! Let's get started!" />
        </div>
        <div style={{ width: '200px', fontSize: '0.8rem' }}>
          <InfoCard title="What to do :)" text="Click the map for random art or drag the timeline to view map evolution over the history!" />
        </div>
      </div>
    </div>
  );
  
  
};

export default MainMapMainMapGoogle;