import { useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON } from 'react-leaflet'
import { Icon } from 'leaflet';
import { useOutletContext } from "react-router-dom"
import LookupBtn from '../../components/map/lookupBtn';
import InfoCard from '../../components/map/InfoCard';
const MainMap = () => {
  const mapRef = useRef(null)

  return(
    <> 
      <MapContainer className='mapContainer my-4'
        center={[51.505, -0.09]}
        zoom={4} 
        scrollWheelZoom={false}
        whenCreated={map => mapRef.current = map}>
        
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <LocationMarker/>
      </MapContainer>

    </>
  )
}

function LocationMarker(props) {
  // props: position, setPosition
  const markerRef = useRef(null)
  const [setFoundData, setRefreshPopup] = useOutletContext()
  const [position, setPosition] = useState([51.505, -0.09])
  const customIcon = new Icon({
    iconUrl: "/mapicon.png",
    iconSize: [38, 38],
  });

  const map = useMapEvents({
    click(evt) {
      const pos = [evt.latlng.lat, evt.latlng.lng]
      setPosition(pos)
      map.flyTo(evt.latlng)
      markerRef.current.openPopup()
    }
  })

  // update search data upon user click "look up" btn
  const handleClick = (evt) => {
    // TODO: center at upper side
    setFoundData(prev => ({
      ...prev,
      location: position,
    }))
    setRefreshPopup(prev => prev >= 0 ? prev+1 : 1)
  }

  
  return(
    <Marker icon={customIcon} position={position} ref={markerRef}>
      <Popup>
        <LookupBtn value="Look up 🔍" handleClick={handleClick}/>
      </Popup>
    </Marker>

  )
}

export default MainMap