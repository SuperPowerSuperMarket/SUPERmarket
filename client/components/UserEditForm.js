import React from 'react'
import { Button, Form, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { putUser } from '../store/users';

const UserEditForm = (props) => {
    const currentUserId = +props.match.params.userId
    const currentUser = props.users.find(user => user.id === currentUserId)
    if (currentUser) {
        return (
            <div className="ui center aligned grid">
                <Form onSubmit={(evt) => props.updateUser(currentUser, evt)}>
                    <Form.Field style={{ marginRight: '4em'}}>
                        <label>First Name</label>
                            <input
                            placeholder={currentUser.firstName}
                            name="firstname"
                            />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                            <input
                            placeholder={currentUser.lastName}
                            name="lastname"
                            />
                    </Form.Field>
                    <br />
                    <Form.Field style={{ marginRight: '4em'}}>
                        <label>Email</label>
                            <input
                            placeholder={currentUser.email}
                            name="email"
                            />
                    </Form.Field>
                    <Form.Field>
                        <label>Mailing Address</label>
                            <input
                            placeholder={currentUser.mailingAddress}
                            name="mailingaddress"
                            />
                    </Form.Field>
                    <br />
                    <Form.Field style={{ marginRight: '4em'}}>
                        <label>Phone</label>
                            <input
                            placeholder={currentUser.phone}
                            name="phone"
                            />
                    </Form.Field>
                    <Form.Field>
                        <label>Billing Address</label>
                            <input
                            placeholder={currentUser.billingAddress}
                            name="billingaddress"
                            />
                    </Form.Field>
                    <br />
                    <div style={{ marginTop: "1em" }} className="ui center aligned grid">
                        <Button basic color='green' type='submit'>Submit</Button>
                    </div>
                </Form>
            </div>
        )
    } else {
        return (  <Loader active inline='centered' /> )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateUser: function(currentUser, evt) {
            evt.preventDefault()
            const currentUserId = currentUser.id
            const updatedUser = {
                id: currentUserId,
                fields: {
                    firstName: evt.target.firstname.value || currentUser.firstName,
                    lastName: evt.target.lastname.value || currentUser.lastName,
                    email: evt.target.email.value || currentUser.email,
                    mailingAddress: evt.target.mailingaddress.value || currentUser.mailingAddress,
                    billingAddress: evt.target.billingaddress.value || currentUser.billingAddress,
                    phone: evt.target.phone.value || currentUser.phone
                }
            }
            dispatch(putUser(updatedUser, ownProps))
            ownProps.history.push('/users-list')
        }
    }
}

const UserEditFormContainer = connect(mapStateToProps, mapDispatchToProps)(UserEditForm)
export default UserEditFormContainer

