import { useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON } from 'react-leaflet'
import { Icon } from 'leaflet';
import { useOutletContext } from "react-router-dom"
import FormBtn from '../../components/form/formBtn';
// import InfoCard from '../../components/map/InfoCard';
// import countries from '../../util/data/countries.json'

const MainMap = () => {
  const mapRef = useRef(null)

  return(
    <>
      <MapContainer className='mapContainer'
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
      {/* <div className="fixed left-8 z-[2000] flex-col justify-center items-center">
        <InfoCard title="Welcome!" text="Click anywhere on the map to start your European art & music journey! Let's get started!"/>
        <InfoCard title="What to do :)" text="Click the map for random art or drag the timeline to view map evolution over the history!"/>
      </div> */}
    </>
  )
}

function LocationMarker(props) {
  // props: position, setPosition
  const markerRef = useRef(null)
  const [, , setFoundData] = useOutletContext()
  const [position, setPosition] = useState([51.505, -0.09])
  const customIcon = new Icon({
    iconUrl: "/mapicon.png",
    iconSize: [38, 38],
  });

  const map = useMapEvents({
    click(evt) {
      console.log(map)
      const pos = [evt.latlng.lat, evt.latlng.lng]
      setPosition(pos)
      map.flyTo(evt.latlng, 5)
      markerRef.current.openPopup()
    }
  })

  const handleClick = (evt) => {
    // TODO: center at upper side
    setFoundData(position)
  }
  
  return(
    <Marker icon={customIcon} position={position} ref={markerRef}>
      <Popup>
        <div className='pt-1'>
          location, location
        </div>
        <FormBtn value="Look up" handleClick={handleClick}/>
      </Popup>
    </Marker>

  )
}


export default MainMap