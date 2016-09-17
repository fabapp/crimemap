import React, { PropTypes } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, OverlayView} from "react-google-maps";
// import {ProgressBar} from './react-bootstrap';
import {ProgressBar} from 'react-bootstrap';
import { default as canUseDOM } from "can-use-dom";
// import { triggerEvent } from "react-google-maps/lib/utils";
import { default as update } from "react-addons-update";


const STYLES = {
  mapContainer: {
    height: `100%`,
  },
  overlayView: {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
  },
};

class CrimeMap extends React.Component {

  constructor(props, context) {
    super(props, context);
    //this.handleWindowResize = .throttle(this.handleWindowResize, 500);
    this.state = this.props.state;
    this.handleMapClick = this.handleMapClick.bind(this);
    this.newCenter = this.newCenter.bind(this);
    this.boundsChangedCallback = this.boundsChangedCallback.bind(this);

    console.log("loadingOverlay ? ", this.state.showLoadingOverlay);
  }

  componentDidMount() {
    if (!canUseDOM) {
      return;
    }
    this.setState({showLoadingOverlay: false});
    window.addEventListener(`resize`, this.handleWindowResize);
  }

  componentWillUnmount() {
    if (!canUseDOM) {
      return;
    }
    window.removeEventListener(`resize`, this.handleWindowResize);
  }
  timeout = 0;
  boundsChangedCallback() {
    const callback = this.props.boundsChangedCallback;
    const map = this._googleMapComponent;
    // google.maps.event.addListener(map, 'bounds_changed', function () {
    window.clearTimeout(this.timeout);
this.setState({showLoadingOverlay: true});
    this.timeout = window.setTimeout(function () {
      //do stuff on event

      callback(map.getBounds())
    }, 500);

  }

  addMarker(/* LatLng */ latLng) {
    let { markers } = this.state;
    //let latLng = new google.maps.LatLng(this.props.state.center.lat, this.props.state.center.lng);
    markers = update(markers, {
      $push: [
        {
          position: latLng,
          defaultAnimation: 2,
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',

          key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });

    this.setState({ markers });
    this.setState({showLoadingOverlay: false});
  }

  newCenter(center) {
    this._googleMapComponent.panTo(center);
  }

  handleWindowResize() {
    //  console.log(`handleWindowResize`, this._googleMapComponent);
    //  triggerEvent(this._googleMapComponent, `resize`);
  }

  /*
  * This is called when you click on the map.
  * Go and try click now.
  */
  handleMapClick(event) {

    let { markers } = this.state;
    markers =
    [
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      }
    ]
    ;
    this.setState({ markers });
    // debugger;
    if (markers.length === 3) {
      this.props.toast(
        `Right click on the marker to remove it`,
        `Also check the code!`
      );
    }
  }



  handleMarkerRightclick(index, event) {
    /*
    * All you modify is data, and the view is driven by data.
    * This is so called data-driven-development. (And yes, it's now in
    * web front end and even with google maps API.)
    */
    let { markers } = this.state;
    markers = update(markers, {
      $splice: [
        [index, 1],
      ],
    });
    this.setState({ markers });
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={
          <div
            style={{
              height: `100%`,
            }}
            />
        }
        googleMapElement={
          <GoogleMap
            containerProps={{
              ...this.props,
              style: {
                height: `100%`,
              },
            }}
            ref={(map) => (this._googleMapComponent = map)}
            defaultZoom={this.props.state.zoom}
            defaultCenter={this.props.state.center}
            position={this.props.state.center}
            onClick={this.handleMapClick}
            draggable={false}
            onBoundsChanged={this.boundsChangedCallback}
            >
            {this.state.markers.map((marker, index) => {
              return (
                <Marker
                  {...marker}
                  onRightclick={this.handleMarkerRightclick.bind(this, index)}
                  />
              );
            })}
            {
              (this.state.showLoadingOverlay) ? (
                <OverlayView ref="loadingOverlay"
                  position={{ lat: this.props.state.center.lat, lng: this.props.state.center.lng }}
                  // bounds= this._googleMapComponent,
                  /*
                  * An alternative to specifying position is specifying bounds.
                  * bounds can either be an instance of google.maps.LatLngBounds
                  * or an object in the following format:
                  * bounds={ {ne: { lat: 62.400471, lng: -150.005608 }, sw: { { lat: 62.281819, lng: -150.287132 } } }
                  */
                  /*
                  * 1. Specify the pane the OverlayView will be rendered to. For
                  *    mouse interactivity, use `OverlayView.OVERLAY_MOUSE_TARGET`.
                  *    Defaults to `OverlayView.OVERLAY_LAYER`.
                  */
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  /*
                  * 2. Tweak the OverlayView's pixel position. In this case, we're
                  *    centering the content.
                  */
                  getPixelPositionOffset={this.getPixelPositionOffset}
                  /*
                  * 3. Create OverlayView content using standard React components.
                  */
                  >
                  <div style={STYLES.overlayView}>
                    <h1>Loading cases...</h1>
                    <ProgressBar active now={100} />
                  </div>
                </OverlayView>) : null

            }
            </GoogleMap>
          }
          />
      );
    }
  }

  export default CrimeMap;
