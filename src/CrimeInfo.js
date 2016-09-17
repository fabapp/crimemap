import React, { Component } from 'react';

class CrimeInfo extends Component {
  constructor(props) {
    super(props);
  }

  render(){

    if(Object.keys(this.props.selectedCrimeEvent).length > 0) {
      return(
        <ul>
          {
            Object.keys(this.props.selectedCrimeEvent).map( (key, cnt) => {
              var value = this.props.selectedCrimeEvent[key];
              console.log('crime event', JSON.stringify(value));
              return <li>{key + ': ' + JSON.stringify(value)}</li>
            })
          }

        </ul>
      )
    } else {
      return(<b>No Match</b>)
    }
  }
}

export default CrimeInfo;
