import React, { useState, useRef, useEffect, useContext } from "react";
import { TimelineContext } from "./MapLayout.jsx";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Icon } from "leaflet";
import axiosProvider from "../../util/api/axios";
import { useOutletContext } from "react-router-dom";
import LookupBtn from "../../components/map/lookupBtn";
import polylabel  from "polylabel";

const MainMap = () => {
  const mapRef = useRef(null);
  const timeInterval = useContext(TimelineContext);

  const [geojsonData, setGeojsonData] = useState(null);

  const getDatasetName = (year) => {
    const startYear = 1000;
    const interval = 100;

    // Calculate the dataset name based on the year
    const datasetYear =
      Math.floor((year - startYear) / interval) * interval + startYear;
    return `world_${datasetYear}`;
  };

  useEffect(() => {
    const fetchBorderData = async () => {
      try {
        // Extract the start year from the timeInterval
        const year = new Date(timeInterval[0]).getFullYear();
        const datasetName = getDatasetName(year);

        const response = await axiosProvider.get("/getBorder", {
          params: { name: datasetName },
        });
        setGeojsonData(response.data);
      } catch (error) {
        console.error("Error fetching border data:", error);
      }
    };

    if (timeInterval && timeInterval.length === 2) {
      fetchBorderData();
    }
  }, [timeInterval]);

  const getCentroid = (multiPolygon) => {
    let totalX = 0;
    let totalY = 0;
    let totalPoints = 0;
    multiPolygon.forEach((polygon) => {
      polygon[0].forEach(([x, y]) => {
        totalX += x;
        totalY += y;
        totalPoints++;
      });
    });
    return [totalY / totalPoints, totalX / totalPoints];
  };

  const createLabelIcon = (labelText) => {
    return L.divIcon({
      className: "text-sm",
      html: `<div className="text-sm">${labelText}</div>`,
    });
  };

  return (
    <>
      <MapContainer
        className="mapContainer my-4"
        center={[51.505, -0.09]}
        zoom={4}
        scrollWheelZoom={false}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geojsonData &&
          geojsonData.features &&
          geojsonData.features
            .filter((feature) => feature.properties.NAME)
            .map((feature, index) => (
              <React.Fragment key={index}>
                <GeoJSON data={feature} />
                <Marker
                  position={getCentroid(feature.geometry.coordinates)}
                  icon={createLabelIcon(feature.properties.NAME)}
                />
              </React.Fragment>
            ))}
        <LocationMarker />
      </MapContainer>
    </>
  );
};

function LocationMarker(props) {
  // props: position, setPosition
  const markerRef = useRef(null);
  const [setFoundData, setRefreshPopup] = useOutletContext();
  const [position, setPosition] = useState([51.505, -0.09]);
  const customIcon = new Icon({
    iconUrl: "/mapicon.png",
    iconSize: [38, 38],
  });

  const map = useMapEvents({
    click(evt) {
      const pos = [evt.latlng.lat, evt.latlng.lng];
      setPosition(pos);
      map.flyTo(evt.latlng);
      markerRef.current.openPopup();
    },
  });

  // update search data upon user click "look up" btn
  const handleClick = (evt) => {
    setFoundData((prev) => ({
      ...prev,
      location: position,
    }));
    setRefreshPopup((prev) => (prev >= 0 ? prev + 1 : 1));
  };

  return (
    <Marker icon={customIcon} position={position} ref={markerRef}>
      <Popup>
        <LookupBtn value="Look up 🔍" handleClick={handleClick} />
      </Popup>
    </Marker>
  );
}

export default MainMap;
