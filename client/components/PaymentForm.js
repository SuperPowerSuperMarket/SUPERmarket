import React, { Component } from 'react';
import { connect } from 'react-redux';
import {injectStripe, CardElement} from 'react-stripe-elements';

class CheckoutForm extends Component {
  handleSubmit = (ev) => {
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
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

//const mapStateToProps = state => ({user: state.user, orders: state.order})
// const mapDispatchToProps = (dispatch, ownProps) => ({
//   updateOrder: (userId, superpower, quantity, orderId) =>
//     dispatch(
//       updateOrder(userId, superpower, quantity, orderId, ownProps.history)
//     )
// });

// const CheckoutFormContainer = connect(mapStateToProps, mapDispatchToProps, {
//   pure: false
// })

export default (injectStripe(CheckoutForm))

//export default CheckoutFormContainer;

