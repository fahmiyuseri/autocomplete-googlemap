import React from "react";
import GoogleMap from "google-map-react";
import { PropTypes } from 'prop-types'
const SimpleMap = ({ lat, lng, zoom }) => {


    return (
        <div style={{ height: '100vh', width: '100%' }}>

            <GoogleMap
                bootstrapURLKeys={{ key: process.env.React_app_GOOGLE_API_KEY }}
                yesIWantToUseGoogleMapApiInternals
                center={{ lat: lat, lng: lng }}
                zoom={zoom}
            >

            </GoogleMap>
        </div>
    );

}

SimpleMap.defaultProps = {
    lat: 2.9374578,
    lng: 101.6055382,
    zoom: 8,

}

export default SimpleMap;