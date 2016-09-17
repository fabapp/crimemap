import React, { Component, ReactDom } from 'react';
import logo from './logo.svg';
import CrimeFeed from './CrimeFeed';
import CrimeMap from './CrimeMap';
import CrimeInfo from './CrimeInfo';
import {PageHeader, Grid, Row, Col} from 'react-bootstrap';
import Api from './Api.js';
import './App.css';
import { default as update } from 'react-addons-update';

class App extends Component {

  state = {
    selectedCrimeEvent : {},
    crimes: [],
    map: {
      center: {lat: 51.500152, lng: -0.126236},
      markers: [{
        position: {
          lat: 65.36388,
          lng: 110.044922,
        },
        key: `London`,
        defaultAnimation: 2,
      }],
      zoom:17,
    },
  };



  constructor(props) {
      super(props)
      this.loadCrimes = this.loadCrimes.bind(this);
      this.onCrimeEventSelection = this.onCrimeEventSelection.bind(this);
      this.boundsChangedCallback = this.boundsChangedCallback.bind(this);
      this.loadCrimes = this.loadCrimes.bind(this);
    //  this.loadCrimes(this.state.map.center.lat, this.state.map.center.lng, this.state.map.center.lat, this.state.map.center.lng);
  }


  timeout = 0;

  boundsChangedCallback(bounds) {
    // TODO: check if loading new items is required because map viewport changed
    // console.log(JSON.stringify(bounds));


    window.clearTimeout(this.timeout);

    // this.timeout = window.setTimeout(
      this.loadCrimes(bounds.f.b + ',' + bounds.b.b,
                      bounds.f.f + ',' + bounds.b.b,
                      bounds.f.b + ',' + bounds.b.f,
                      bounds.f.f + ',' + bounds.b.f);
      // , 1000);

  }

  onCrimeEventSelection(crimeEvent) {
    // this.refs.mapC.newCenter(new google.maps.LatLng(crimeEvent.location.latitude, crimeEvent.location.longitude));
    this.refs.mapC.addMarker(new google.maps.LatLng(crimeEvent.location.latitude, crimeEvent.location.longitude));
    this.setState({selectedCrimeEvent:crimeEvent});
    console.log('selected crime event', this.state.selectedCrimeEvent);
  }

  loadCrimes(west, south, east, north) {
    // add

    Api.retrieveCrimes(west, south, east, north, (data) => {
      this.setState({crimes: data});
      this.state.crimes.map((item, index) => {
        this.refs.mapC.addMarker(new google.maps.LatLng(item.location.latitude, item.location.longitude));
      });
    });
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
         <PageHeader>UK CrimeMap<br/><small>Crimes in UK by date</small></PageHeader>
        </div>
        <Grid>
          <Row >
            <Col md={2}>
              <div  className='mapContainer'>
              <CrimeFeed ref='crimeFeed' crimeEvents={this.state.crimes} callback={this.onCrimeEventSelection} {... this.props}/>
              </div>
            </Col>
            <Col md={10}>
              <div className='mapContainer'>
                <CrimeMap ref='mapC' mapCenterLat={this.state.map.center.lat} boundsChangedCallback={this.boundsChangedCallback} mapCenterLng={this.state.map.center.lng} state={this.state.map} {... this.props}/>
              </div>
              <Row>
                <Col><CrimeInfo selectedCrimeEvent={this.state.selectedCrimeEvent}/></Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}


export default App;
