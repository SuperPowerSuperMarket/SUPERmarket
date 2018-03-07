import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {Header, Button} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {user} = props

  return (
    <Header style={{marginLeft: '2em'}}>
      <h3>Welcome, {user.email}</h3>
      {
        props.user.passwordReset ?
        (<Link to="/reset-password">
           <Button color="red">
            Reset Your Password
           </Button>
         </Link>) : null
      }
    </Header>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapState)(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
