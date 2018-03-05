import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, AllSuperpowers, SingleSuperpower, Cart, UserListAdmin, UserEditForm, SuperpowerForm} from './components'
import store, {me} from './store'
import {fetchOrders} from './store/orders'
import { fetchSuperpowers } from './store/superpowers'
import { fetchUsers } from './store/users'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    const superpowersThunk = fetchSuperpowers()
    const getOrdersThunk = fetchOrders()
    const getUsersThunk = fetchUsers()
    store.dispatch(superpowersThunk)
    store.dispatch(getOrdersThunk)
    store.dispatch(getUsersThunk)
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props
    console.log(this.props)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/all-superpowers" component={AllSuperpowers} />
        <Route exact path="/single-superpower/:superpowerId" component={SingleSuperpower} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/single-superpower/:superpowerId/edit" component={SuperpowerForm} />
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
      dispatch(me())
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
