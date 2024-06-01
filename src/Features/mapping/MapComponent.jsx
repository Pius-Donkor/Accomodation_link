// MapComponent.js
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-rotatedmarker";
const apartmentLocation = [6.673771638600438, -1.571871062809676];
const MapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [userHeading, setUserHeading] = useState(0);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const handlePosition = (position) => {
      const { latitude, longitude, heading } = position.coords;
      setUserLocation([latitude, longitude]);

      setUserHeading(heading || 0);
    };

    const watchId = navigator.geolocation.watchPosition(
      handlePosition,
      console.error,
      {
        enableHighAccuracy: true,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (userLocation && apartmentLocation) {
      console.log("fetching");
      fetchRoute(userLocation, apartmentLocation);
    }
  }, [userLocation]);

  const fetchRoute = async (start, end) => {
    const response = await fetch(
      `http://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`,
    );
    const data = await response.json();
    const routeCoordinates = data.routes[0].geometry.coordinates.map(
      (coord) => [coord[1], coord[0]],
    );
    console.log(data);
    setDistance(data.routes[0].distance);
    setDuration(data.routes[0].duration);
    setRoute(routeCoordinates);
  };

  return (
    <MapContainer
      center={apartmentLocation}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {userLocation && (
        <Marker
          position={userLocation}
          icon={L.icon({
            iconUrl: "/placeholder.png", // Replace with your arrow icon URL
            iconSize: [38, 38],
            iconAnchor: [19, 19],
            popupAnchor: [0, -20],
          })}
          rotationAngle={userHeading}
          rotationOrigin="center"
        >
          <Popup autoClose={false} keepInView={true}>
            Your Location
          </Popup>
        </Marker>
      )}
      {apartmentLocation && (
        <Marker position={apartmentLocation}>
          <Popup>Apartment Location</Popup>
        </Marker>
      )}
      {route.length > 0 && <Polyline positions={route} color="blue" />}
      <div className=" absolute right-2 top-2 z-[500] w-96 rounded-sm bg-[#ffffffdc] p-1 shadow-sm ">
        <p>Distance: {(distance / 1000).toFixed(2)} km</p>
        <p>Duration: {(duration / 60).toFixed(2)} mins</p>
      </div>
    </MapContainer>
  );
};

export default MapComponent;
