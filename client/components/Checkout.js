import React, { Component } from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'
import {pendingOrder} from '../store'
import { connect } from 'react-redux';

class Checkout extends Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const user = this.props.user
    const orders = this.props.orders
    const orderId = orders.find(order => order.status === 'active').id
    const firstName = event.target.firstName.value || user.firstName
    const lastName = event.target.lastName.value  || user.lastName
    const shippingAddress = event.target.mailingAddress.value || user.mailingAddress
    const fullName = firstName + '' + lastName
    
    this.props.pendingOrder(orderId, fullName, shippingAddress)
  }

  render() {
    const user = this.props.user
    const orders = this.props.orders
    console.log(user);
    if (!user) return <h3>Loading...</h3>

    if (!orders.find(order => order.status === 'active')) return <h3>Loading...</h3>
    return (
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

const mapStateToProps = state => ({ user: state.user, orders: state.orders })

const mapDispatchToProps = (dispatch, ownProps) => ({
  pendingOrder: (orderId, fullName, shippingAddress) => dispatch(pendingOrder(orderId, fullName, shippingAddress, ownProps.history))
})

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout)

export default CheckoutContainer;
