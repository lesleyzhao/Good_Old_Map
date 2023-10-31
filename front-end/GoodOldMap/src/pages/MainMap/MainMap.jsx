import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { Icon } from 'leaflet';

const MainMap = () => {
  const [position, setPosition] = useState([51.505, -0.09])

  return(
    <>
      <MapContainer className='mapContainer' center={position} zoom={4} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition}/>
      </MapContainer>
    </>
  )
}

function LocationMarker(props) {
  useMapEvents({
    click(evt) {
      props.setPosition([evt.latlng.lat, evt.latlng.lng])
    },
  })
  const customIcon = new Icon({
    iconUrl: "/mapicon.png",
    iconSize: [38, 38],
  });
  return(
    <Marker icon={customIcon} position={props.position}>
      {/* <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup> */}
    </Marker>

  )
}


export default MainMap