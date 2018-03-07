import React, { Component } from 'react';
import { connect } from 'react-redux';
import {injectStripe, CardElement} from 'react-stripe-elements';
import {completeOrder} from '../store';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const user = this.props.user.fullName
    const activeOrder = this.props.orders.find(order => order.status === 'active');
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: user}).then(({token}) => {
      console.log('Received Stripe token:', token);
      this.props.completeOrder(activeOrder.id, activeOrder.subTotal, token.id)
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
        Card details
        <CardElement style={{base: {fontSize: '18px'}}} />
      </label>
        <button>Confirm order</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({user: state.user, orders: state.orders})

const mapDispatchToProps = (dispatch, ownProps) => ({
  completeOrder: (orderId, amount, token) => {
    dispatch(completeOrder(orderId, amount, token, ownProps.history))
  }

});

// const CheckoutFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {
//   pure: false,
// })(injectStripe(CheckoutForm))

const CheckoutFormContainer = injectStripe(connect(mapStateToProps, mapDispatchToProps)(CheckoutForm))

export default CheckoutFormContainer;
