import React, { PropTypes } from 'react';
import {ListGroup} from 'react-bootstrap';
import CrimeFeedItem from './CrimeFeedItem';

class CrimeFeed extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
      <ListGroup>
        {this.props.crimeEvents.map( (item, index) => {
          return(<CrimeFeedItem key={"item"+index} item={item} {... this.props}/>);
        })}
      </ListGroup>
    )
  }
}



export default CrimeFeed;
