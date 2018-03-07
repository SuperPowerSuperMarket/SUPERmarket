import React, { Component } from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'
import {pendingOrder} from '../store'
import { connect } from 'react-redux';

class Checkout extends Component {

  constructor(props) {
    super(props)
    this.state = {}

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const user = this.props.user
    const orderId = user.orders.find(order => order.status === 'active').id
    const firstName = event.target.firstName.value || user.firstName
    const lastName = event.target.lastName.value  || user.lastName
    const shippingAddress = event.target.mailingAddress.value || user.mailingAddress
    const fullName = firstName + '' + lastName
    
    this.props.pendingOrder(orderId, fullName, shippingAddress)
  }

  render() {
    const user = this.props.user
    if (!user.orders.find(order => order.status === 'active')) return <h3>Loading...</h3>
    return !user ?
    <h3>Loading...</h3>
  : (
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>First Name</label>
            <input
              name="firstName"
              placeholder={user.firstName}
              />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input
              name="lastName"
              placeholder={user.lastName}
            />
          </Form.Field>
          <Form.Field>
          <label>Shipping Address</label>
            <input
              name="mailingAddress"
              placeholder={user.mailingAddress}
            />
          </Form.Field>
          <br />
          <Button type="submit">Submit</Button>
        </Form>
      )
  }
}

const mapStateToProps = state => ({ user: state.user })

const mapDispatchToProps = (dispatch, ownProps) => ({
  pendingOrder: (orderId, fullName, shippingAddress) => dispatch(pendingOrder(orderId, fullName, shippingAddress, ownProps.history))
})

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout)

export default CheckoutContainer;
