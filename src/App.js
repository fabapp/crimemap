import React, { Component } from 'react';
import logo from './logo.svg';
import CrimeFeed from './CrimeFeed';
import CrimeMap from './CrimeMap';
import {Grid, Row, Col} from 'react-bootstrap';
import Api from './Api.js';
import './App.css';

class App extends Component {

  constructor(props) {
      super(props)
      this.state = {crimes: []};
      this.loadCrimes = this.loadCrimes.bind(this);
      this.loadCrimes();
  }

  loadCrimes() {
    Api.retrieveCrimes((data) => {
      this.setState({crimes: data});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Crime Map</h2>
        </div>
        <Grid>
          <Row  >
            <Col md={2}>
              <CrimeFeed crimeEvents={this.state.crimes}/>
            </Col>
            <Col md={10}>jahvdkjh
              <div className="mapContainer">
                <CrimeMap/>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
