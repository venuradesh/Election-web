import React, { Component } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

//const LIBRARIES = ["places"];

class Map extends Component {
  render() {
    const { center } = this.props;

    return (
      <div className="wrapper">
        <LoadScript googleMapsApiKey="AIzaSyCS-jRLSrbzWY0cSZrQcg1zdjBAAjm27dE">
          <GoogleMap
            id="map"
            center={center}
            zoom={10}
            mapContainerStyle={{
              width: "700px",
              height: "300px",
            }}
          >
            {/*  Marker component */}
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }
}

export default Map;
