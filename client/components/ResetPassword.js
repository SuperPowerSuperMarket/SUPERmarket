import React from 'react'
import { Button, Form, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { putUser } from '../store/users';

const ResetPassword = (props) => {
    const currentUser = props.user

    if (currentUser) {
        return (
            <div className="ui center aligned grid">
                <Form onSubmit={(evt) => props.updateUser(currentUser, evt)}>
                  <Form.Field>
                    <label>Old Password</label>
                    <input
                    name="oldPassword"
                    type="password"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>New Password</label>
                    <input
                    name="newPassword"
                    type="password"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Repeat New Password</label>
                    <input
                    name="repeat"
                    type="password"
                    />
                  </Form.Field>
                  <Button basic color='green' type='submit'>
                    Submit
                  </Button>
                </Form>
            </div>
        )
    } else {
        return (  <Loader active inline='centered' /> )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateUser: function(currentUser, evt) {
            evt.preventDefault()

            dispatch(putUser(updatedUser, ownProps))
            ownProps.history.push('/users-list')
        }
    }
}

const UserEditFormContainer = connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
export default UserEditFormContainer

