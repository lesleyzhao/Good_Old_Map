import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON } from 'react-leaflet'
import { Icon } from 'leaflet';
import { useOutletContext } from "react-router-dom"
// import InfoCard from '../../components/map/InfoCard';
// import countries from '../../util/data/countries.json'

const MainMap = () => {
  const [position, setPosition] = useState([51.505, -0.09])

  return(
    <>
    {/* <div className="fixed left-8 z-[2000] flex-col justify-center items-center">
      <InfoCard title="Welcome!" text="Click anywhere on the map to start your European art & music journey! Let's get started!"/>
      <InfoCard title="What to do :)" text="Click the map for random art or drag the timeline to view map evolution over the history!"/>
   </div> */}

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
  const [, foundData, setFoundData] = useOutletContext()
  useMapEvents({
    click(evt) {
      const pos = [evt.latlng.lat, evt.latlng.lng]
      props.setPosition(pos)
      // TODO: subject to change
      setFoundData(pos)
    },
  })
  const customIcon = new Icon({
    iconUrl: "/mapicon.png",
    iconSize: [38, 38],
  });
  return(
    <Marker icon={customIcon} position={props.position}>
    </Marker>

  )
}


export default MainMap