import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, AllSuperpowers, SingleSuperpower, Cart, UserListAdmin, UserEditForm, SuperpowerForm, 
  AccountInfo, AccountSpecificInfo, OrderHistory, OrderDetail, Checkout, Payment, ResetPassword, Confirmation} from './components'
import {me, fetchOrders, fetchSuperpowers, fetchUsers, fetchReviews, fetchOrderQuants} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/all-superpowers" component={AllSuperpowers} />
        <Route path="/all-superpowers/add" component={SuperpowerForm} />
        <Route exact path="/single-superpower/:superpowerId" component={SingleSuperpower} />
        <Route path="/single-superpower/:superpowerId/edit" component={SuperpowerForm} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/payment" component={Payment} />
        <Route path="/confirmation" component={Confirmation} />
        <Route path="/my-account" component={AccountInfo} />
        <Route exact path="/order-history" component={OrderHistory} />
        <Route path="/order-history/:orderId" component={OrderDetail} />
        <Route path="/edit-account" component={AccountSpecificInfo} />
        <Route path="/reset-password" component={ResetPassword} />
        {
          isLoggedIn &&
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/users-list" component={UserListAdmin} />
            <Route path="/edit-user/:userId" component={UserEditForm} />
          </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(fetchSuperpowers())
      dispatch(fetchUsers())
      dispatch(fetchOrderQuants())
      dispatch(fetchReviews())
      dispatch(me())
      dispatch(fetchOrders())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
