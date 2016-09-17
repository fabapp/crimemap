import React, { PropTypes } from 'react'
import {ListGroupItem} from 'react-bootstrap'

class CrimeFeedItem extends React.Component {

  constructor(props) {
    super(props);
    this.onCrimeEventSelection = this.onCrimeEventSelection.bind(this);
  }

  onCrimeEventSelection() {
    this.props.callback(this.props.item);
  }

  render () {
    return(
      <ListGroupItem header={this.props.item.category} onClick={this.onCrimeEventSelection}>
        {this.props.item.month}
        {this.props.item.outcome_status ? this.props.item.outcome_status.category : ''}
      </ListGroupItem>
    )
  }
}

export default CrimeFeedItem;
