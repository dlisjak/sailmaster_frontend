import React from "react";
import GoogleMapReact from "google-map-react";
import { fitBounds } from "google-map-react/utils";
import supercluster from "points-cluster";

import { useTranslation } from "next-i18next";

import {
  GOOGLE_MAPS_OPTIONS,
  GOOGLE_MAPS_API_KEY,
} from "../../../constants/googleMaps";

import LatLngBounds from "./utils/LatLngBounds";
import LatLng from "./utils/LatLng";
import GoogleMapPin from "./GoogleMapPin";

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      radius: 40,
      markers: [],
      showMap: false,
    };

    // Bind functions
    this.createMapOptions = this.createMapOptions.bind(this);
    this.onZoomChange = this.onZoomChange.bind(this);
    this.onChangeMap = this.onChangeMap.bind(this);
    this.onClusterClick = this.onClusterClick.bind(this);
    this.setData = this.setData.bind(this);
  }

  componentDidMount() {
    this.setData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setData(nextProps);
  }

  setData(nextProps) {
    if (!!nextProps.locations && !!nextProps.clusters) {
      const radius = this.state.radius;
      const bounds = new LatLngBounds();
      const markers = [];
      let markersWithClusters = [];
      const locations = JSON.parse(JSON.stringify(nextProps.locations));

      locations.forEach((location) => {
        if (
          typeof location.lat === "string" &&
          typeof location.lon === "string"
        ) {
          location.lat = parseFloat(location.lat);
          location.lng = parseFloat(location.lon);
        }

        bounds.extend(new LatLng(location.lat, location.lon));

        markers.push(location);
      });

      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      if (locations.length === 1) {
        const ne = bounds.getNorthEast();
        const center = { lat: ne.lat, lng: ne.lng };

        const cl = supercluster(markers, { radius: radius });
        markersWithClusters = cl({
          bounds: {
            nw: { lat: ne.lat, lng: sw.lng },
            se: { lat: sw.lat, lng: ne.lng },
          },
          zoom: 15,
        });

        this.setState({
          center,
          zoom: 15,
          markers: [markersWithClusters[0]],
          showMap: true,
        });
      } else if (locations.length > 1) {
        const width = document.getElementById("google-map").clientWidth;
        const height = document.getElementById("google-map").clientHeight;

        const nw = { lat: ne.lat, lng: sw.lng };
        const se = { lat: sw.lat, lng: ne.lng };
        const { center, zoom } = fitBounds(
          {
            se: { lat: se.lat, lng: se.lng },
            nw: { lat: nw.lat, lng: nw.lng },
          },
          { width: width, height: height }
        );

        const cl = supercluster(markers, { radius: radius });
        markersWithClusters = cl({
          bounds: {
            nw: { lat: ne.lat, lng: sw.lng },
            se: { lat: sw.lat, lng: ne.lng },
          },
          zoom: zoom,
        });

        // Set results state
        this.setState({
          center,
          zoom,
          markers: markersWithClusters,
          showMap: true,
        });
      } else {
        this.setState({
          center: { lat: 0, lng: 0 },
          zoom: 1,
          results: 0,
          markers: [],
          showMap: true,
        });
      }
    }
  }

  onZoomChange(_zoom) {
    if (!!this.props.locations && !!this.props.clusters) {
      const radius = this.state.radius;
      const bounds = new LatLngBounds();
      const markers = [];
      let markersWithClusters = [];
      const locations = JSON.parse(JSON.stringify(this.props.locations));

      locations.forEach((location) => {
        if (
          typeof location.lat === "string" &&
          typeof location.lon === "string"
        ) {
          location.lat = parseFloat(location.lat);
          location.lng = parseFloat(location.lon);
        }

        bounds.extend(new LatLng(location.lat, location.lon));

        markers.push(location);
      });

      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      if (locations.length === 1) {
        const ne = bounds.getNorthEast();
        const center = { lat: ne.lat, lng: ne.lng };

        const cl = supercluster(markers, { radius: radius });
        markersWithClusters = cl({
          bounds: {
            nw: { lat: ne.lat, lng: sw.lng },
            se: { lat: sw.lat, lng: ne.lng },
          },
          zoom: 15,
        });

        this.setState({
          zoom: 15,
          markers: [markersWithClusters[0]],
          showMap: true,
        });
      } else if (locations.length > 1) {
        const width = document.getElementById("google-map").clientWidth;
        const height = document.getElementById("google-map").clientHeight;

        const nw = { lat: ne.lat, lng: sw.lng };
        const se = { lat: sw.lat, lng: ne.lng };
        const { center, zoom } = fitBounds(
          {
            se: { lat: se.lat, lng: se.lng },
            nw: { lat: nw.lat, lng: nw.lng },
          },
          { width: width, height: height }
        );

        const cl = supercluster(markers, { radius: radius });
        markersWithClusters = cl({
          bounds: {
            nw: { lat: ne.lat, lng: sw.lng },
            se: { lat: sw.lat, lng: ne.lng },
          },
          zoom: _zoom,
        });

        // Set results state
        this.setState({
          zoom: _zoom,
          markers: markersWithClusters,
          showMap: true,
        });
      } else {
        this.setState({
          center: { lat: 0, lng: 0 },
          zoom: 1,
          results: 0,
          markers: [],
          showMap: true,
        });
      }
    }
  }

  onChangeMap({ center, zoom, bounds, ...other }) {
    this.setState({ center });
    this.onZoomChange(zoom);
  }

  onClusterClick(e, marker) {
    this.onZoomChange(this.state.zoom + 1);
    this.setState({
      center: { lat: marker.y, lng: marker.x },
    });
  }

  // Google maps options
  createMapOptions() {
    return {
      styles: GOOGLE_MAPS_OPTIONS,
      scrollwheel: false,
    };
  }

  render() {
    const { t } = useTranslation("common");
    let pins = "";

    if (this.state.markers.length > 0) {
      pins = this.state.markers.map((marker, i) => {
        if (marker.numPoints > 1) {
          return (
            <GoogleMapPin
              lat={marker.y}
              lng={marker.x}
              cluster={true}
              key={`${marker.y}-${marker.x}`}
              number={marker.points.length}
              onClick={(e) => this.onClusterClick(e, marker)}
            />
          );
        }

        return (
          <GoogleMapPin
            lat={marker.y}
            lng={marker.x}
            cluster={false}
            key={`${marker.y}-${marker.x}`}
            location={marker.points[0]}
          />
        );
      });
    }

    return (
      <div className="google-map" id="google-map">
        {this.state.showMap ? (
          <GoogleMapReact
            bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
            center={this.state.center}
            zoom={this.state.zoom}
            options={this.createMapOptions}
            draggable={true}
            debounced={true}
            onChange={this.onChangeMap}
          >
            {pins}
          </GoogleMapReact>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
export default GoogleMap;
