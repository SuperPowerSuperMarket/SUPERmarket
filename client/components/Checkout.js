import React, { Component } from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class Checkout extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value

      this.setState({
        [name]: value
      })
  }

  render() {
  return (
    <Form>
    <Form.Field>
      <label>First Name</label>
      <input
      name="firstName"
      value={this.state.user ? this.state.user.firstName : ''}
      required
      onChange={this.handleChange} />
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input
      value={this.state.user ? this.state.user.lastName : ''}
      required
      onChange={this.handleChange} />
    </Form.Field>
    <Form.Field>
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
  )
}
}

const mapStateToProps = state => ({user: state.user})

const CheckoutContainer = withRouter(connect(mapStateToProps)(Checkout))

export default CheckoutContainer;
