import React, { PropTypes } from 'react'
import { GoogleMapLoader, GoogleMap, Marker, SearchBox } from "react-google-maps";

class CrimeMap extends React.Component {

render () {

    return (
      <GoogleMap
             containerProps={{
               ...this.props,
               style: {
                 height: `100%`,
               },
             }}
             defaultZoom={8}
             defaultCenter={{ lat: -34.397, lng: 150.644 }}
           />
    );
  }
}

export default CrimeMap;
