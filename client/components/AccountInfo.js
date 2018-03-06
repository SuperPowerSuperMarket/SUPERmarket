import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { Card, Icon, Image, Input, Button } from 'semantic-ui-react'

export const AccountInfo = (props) => {

  return (
    <div className="ui center aligned grid">
      <Card>
        <Card.Content className="ui center
        aligned grid">
          <h1>
            {props.user.firstName}'s
            <br />
            Account Details
          </h1>
        </Card.Content>
        <Card.Content className="ui center
        aligned grid">
          <h4>First Name:</h4>
          <p>{props.user.firstName}</p>
          <Link to={'/edit-firstname'}>

          </Link>
        </Card.Content>
        <Card.Content className="ui center
        aligned grid">
          <h4>Last Name: </h4>
          <p>{props.user.lastName}</p>
        </Card.Content>
        <Card.Content className="ui center
        aligned grid">
          <h4>Email: </h4>
          <p>{props.user.email}</p>
        </Card.Content>
        <Card.Content className="ui center
        aligned grid">
          <h4>Mailing Address: </h4>
          <p>{props.user.mailingAddress}</p>
        </Card.Content>
        <Card.Content className="ui center
        aligned grid">
          <h4>Billing Address: </h4>
          <p>{props.user.billingAddress}</p>
        </Card.Content>
        <Card.Content className="ui center
        aligned grid">
          <h4>Phone: </h4>
          <p>{props.user.phone}</p>
        </Card.Content>
        <Card.Content className="ui center
        aligned grid">
          <Link to={'/edit-account'}>
            <Button style={{ marginBottom: '1em' }} basic color='green'>Edit Your Account</Button>
          </Link>
          <Link to="/order-history">
            <Button style={{ marginBottom: '1em' }} basic color='blue'>View Your Order History</Button>
          </Link>
        </Card.Content>
      </Card>
    </div>
  )
}

const mapState = (state) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapState)(AccountInfo))
