import GoogleMapReact from 'google-map-react';

import { GOOGLE_MAPS_OPTIONS, GOOGLE_MAPS_API_KEY } from '../constants/googleMaps';

const Marker = () => (
  <div className="map__marker">
    <img src="/media/marker.png" alt="marker" />
  </div>
);

const GoogleMap = ({ lat, lng }) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
      defaultCenter={{ lat, lng }}
      defaultZoom={11}
      options={(maps) => ({ styles: GOOGLE_MAPS_OPTIONS })}
    >
      <Marker />
    </GoogleMapReact>
  );
};

export default GoogleMap;
