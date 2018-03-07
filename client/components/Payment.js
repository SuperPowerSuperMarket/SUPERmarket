import { Elements } from 'react-stripe-elements';
import React, { Component } from 'react';
import InjectedCheckoutForm from './PaymentForm';

export default class Payment extends Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    )
  }
}