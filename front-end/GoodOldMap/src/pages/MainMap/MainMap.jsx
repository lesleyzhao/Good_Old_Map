import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
import usePreventZoom from '../../util/hooks/usePreventZoom';

const MainMap = () => {
  usePreventZoom()
  const [position, setPosition] = useState([51.505, -0.09]);

  const customIcon = new Icon({
    iconUrl: "/mapicon.png",
    iconSize: [38, 38],
  });
  return(
    <>
      <MapContainer className='mapContainer' center={position} zoom={4} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  )
}

export default MainMap