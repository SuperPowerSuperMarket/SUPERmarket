import React, { Component } from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'
import {updateOrder} from '../store'
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
    const firstName = event.target.firstName.value
    const lastName = event.target.lastName.value
    const mailingAddress = event.target.mailingAddress.value
    const userInfo = {firstName: firstName || user.firstName,
                      lastName: lastName || user.lastName,
                      mailingAddress: mailingAddress || user.mailingAddress,
                      }
    
    this.props.updateOrder(orderId, userInfo)
  }

  render() {
    const user = this.props.user
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
  updateOrder: (orderId, userInfo) => dispatch(updateOrder(orderId, userInfo, ownProps.history))
})

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout)

export default CheckoutContainer;
