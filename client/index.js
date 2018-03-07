import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import { StripeProvider } from 'react-stripe-elements';

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <StripeProvider apiKey="pk_test_xcZDDbzeJUlgAXbpUwImx8kl">
        <App />
      </StripeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
