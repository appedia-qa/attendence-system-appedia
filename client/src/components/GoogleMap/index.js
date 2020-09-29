import React, { useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";
const containerStyle = {
  width: "100%",
  height: "400px",
  border: "none",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MyComponent = (props) => {
  const mapRef = useRef(null);
  const [map, setMap] = React.useState({
    address: "",
    position: {
      lat: "",
      lng: "",
    },
  });

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const callMe = (event) => {
    console.log("i am callred", event);
    setMap({
      ...map,
      fullAddress: event,
    });
  };
  useEffect(() => {
    if (props.lat && props.lng && props.address) {
      if (
        props.lat !== map.position.lat ||
        props.lng !== map.position.lng ||
        props.address !== map.address
      ) {
        setMap({
          ...map,
          position: {
            lat: props.lat,
            lng: props.lng,
          },
          address: props.address,
          fullAddress: props.address,
        });
      }
    }
  }, [props]);

  if (!map || !map.address || !map.position.lat) {
    return;
  }

  console.log(map);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCkUOsUDTcIiwzSIj29kX8ZQEYb7AoXfO8"
      libraries={["places"]}
      types={["geocode", "regions"]}
      center={map.position}
    >
      <Autocomplete
        style={{
          width: "98.8%",
          height: "40px",
          marginTop: "2rem",
          marginBottom: "1rem",
          border: "1px solid #C8C8C8",
          borderRadius: "5px",
        }}
        types={["(regions)"]}
        value={map.fullAddress}
        onChange={(e) => callMe(e.target.value)}
        onPlaceSelected={props.onPlaceSelected}
      />
      <GoogleMap
        center={map.position}
        mapContainerStyle={containerStyle}
        zoom={14}
        tilt={45}
        onUnmount={onUnmount}
      >
        <Marker
          draggable={true}
          onDragEnd={props.onMarkerDragEnd}
          position={map.position}
        >
          <InfoWindow position={map.position}>
            <div>{map.address}</div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(MyComponent);
