import React, { PropTypes } from 'react'
import {Label, ListGroup, ListGroupItem} from 'react-bootstrap'

class CrimeFeed extends React.Component {

  constructor(props) {
    super(props);

  }

  render () {
    console.log('feed');
    const crimeCategory = this.props.crimeEvents.map( (item, index) => {
      var itemStatus = item.outcome_status ? item.outcome_status.category : "";
      return (<ListGroupItem header={item.category}>

                  {item.month}
                  {itemStatus}
                  
              </ListGroupItem>

              );
    });



    return(
      <ListGroup>
        {crimeCategory}
      </ListGroup>
    )
  }
}



export default CrimeFeed;
