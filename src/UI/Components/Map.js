import React, { useEffect, useState } from "react";
import Map from "react-map-gl";
import "./Map.css";
let token =
  "pk.eyJ1IjoiYW1pdDMzMyIsImEiOiJjbGd4OWNycnkwbDRjM2xuMTU5czRlYXRlIn0.LQQ0cy3xGFPxYarILaUfEw";
const Map1 = (props) => {
  const [viewport, setViewport] = useState({
    lat: 27.1751448,
    lng: 78.0399535,
  });
  console.log(props.location);
  useEffect(() => {
    setViewport({
      longitude: -100,
      latitude: 40,
      zoom: 3.5,
    });
  }, []);
  console.log(viewport);
  return (
    <div className="mapContainer">
      <Map
        mapboxAccessToken={token}
        initialViewState={{
          longitude: 27.173891,
          latitude: 78.042068,
          zoom: 3.5,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
      ;
    </div>
  );
};

export default Map1;
