// MapComponent.js
import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-rotatedmarker";
import "leaflet-fullscreen";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import { MdOutlineDirectionsRun } from "react-icons/md";
import { GiDuration } from "react-icons/gi";
const tempCoordinates = [
  { latitude: 5.555, longitude: -0.1971 }, // Independence Square (Black Star Square)
  { latitude: 5.558, longitude: -0.2065 }, // Kwame Nkrumah Memorial Park
  { latitude: 5.556, longitude: -0.2056 }, // National Museum of Ghana
  { latitude: 5.5471, longitude: -0.1565 }, // Labadi Beach
  { latitude: 5.5401, longitude: -0.2239 }, // Jamestown Lighthouse
  { latitude: 5.5432, longitude: -0.2019 }, // Makola Market
  { latitude: 5.547, longitude: -0.187 }, // Osu Castle (Fort Christiansborg)
  { latitude: 5.558, longitude: -0.1877 }, // W.E.B. Du Bois Center
  { latitude: 5.5563, longitude: -0.1985 }, // Accra Arts Centre
  { latitude: 5.5401, longitude: -0.2251 }, // James Town
  { latitude: 5.5613, longitude: -0.2251 }, // Korle Bu Teaching Hospital
  { latitude: 5.5516, longitude: -0.1922 }, // Accra International Conference Centre
  { latitude: 5.56, longitude: -0.1696 }, // Teshie-Nungua Beach
  { latitude: 5.5564, longitude: -0.1848 }, // Osu Oxford Street
  { latitude: 5.556, longitude: -0.2056 }, // Kwame Nkrumah Mausoleum
  { latitude: 5.6385, longitude: -0.1784 }, // Accra Mall
  { latitude: 5.556, longitude: -0.207 }, // Loom Art Gallery
  { latitude: 5.5402, longitude: -0.2285 }, // Holy Trinity Cathedral
  { latitude: 5.558, longitude: -0.1877 }, // W.E.B. Du Bois Memorial Centre for Pan-African Culture
  { latitude: 5.6141, longitude: -0.2177 }, // Achimota Forest
];

const MapComponent = ({
  carouselScreenState,
  propertyId,
  coordinates = [],
}) => {
  const [userLocation, setUserLocation] = useState(null);
  const [userHeading, setUserHeading] = useState(0);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  console.log(propertyId);
  const apartmentLocation = useMemo(
    () =>
      propertyId
        ? [
            tempCoordinates[propertyId].latitude,
            tempCoordinates[propertyId].longitude,
          ]
        : coordinates,
    [propertyId],
  );
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
      // console.log("fetching");
      fetchRoute(userLocation, apartmentLocation);
    }
  }, [userLocation, apartmentLocation]);

  const fetchRoute = async (start, end) => {
    const response = await fetch(
      `http://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`,
    );
    const data = await response.json();
    const routeCoordinates = data.routes[0].geometry.coordinates.map(
      (coord) => [coord[1], coord[0]],
    );
    // console.log(data);
    setDistance(data.routes[0].distance);
    setDuration(data.routes[0].duration);
    setRoute(routeCoordinates);
  };
  // console.log(carouselScreenState);
  return (
    <MapContainer
      center={apartmentLocation}
      zoom={13}
      style={{
        height: "100%",
        width: "100%",
      }}
      zoomControl={!carouselScreenState}
      fullscreenControl={true}
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
          <Popup autoPan={false}>Your Location</Popup>
        </Marker>
      )}
      {apartmentLocation && (
        <Marker autoPan={false} position={apartmentLocation}>
          <Popup keepInView={true}>Apartment Location</Popup>
        </Marker>
      )}
      {route.length > 0 && <Polyline positions={route} color="blue" />}
      <div className=" absolute right-2 top-2 z-[500]   rounded-sm bg-[#ffffffdc] p-1 shadow-sm ">
        <p className="flex items-center gap-1 text-sm ">
          <MdOutlineDirectionsRun /> Distance: {(distance / 1000).toFixed(2)} km
        </p>
        <p className="flex items-center gap-1 text-sm">
          <GiDuration /> Duration: {(duration / 60).toFixed(2)} mins
        </p>
      </div>
    </MapContainer>
  );
};

export default MapComponent;
