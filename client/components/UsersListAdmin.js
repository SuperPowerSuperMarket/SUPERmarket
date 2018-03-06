import React from 'react'
import { Button, Card, Grid, Loader, Header } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteUser } from '../store/users'
import DisplayOrders from './DisplayOrders'

const UserListAdmin = (props) => {
    let otherUsers;
    if (props.users && props.currentUser) {
        otherUsers = props.users.filter(user => user.id !== props.currentUser.id)
    }
    if (!props.users.length) { return (  <Loader active inline='centered' /> ) }
    else {
     return (
         <div>
            <Grid className="ui center aligned grid">
            <Grid.Row>
            <Header as="h1">User List</Header>
            </Grid.Row>
            <Grid.Row>
                <Card.Group>
                {
                    otherUsers.map(user => {
                        return (
                            <Card key={user.id}>
                                <Card.Content>
                                    <Card.Header>
                                        {user.fullName}
                                    </Card.Header>
                                    <Card.Description>
                                        User since {user.createdAt.slice(0, 10)}
                                    </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                    <div className="ui two buttons">
                                        <Link to={`/edit-user/${user.id}`}>
                                            <Button basic color="green">Edit</Button>
                                        </Link>
                                        <Button onClick={() => props.removeUser(user.id)} basic color="red">Delete</Button>
                                    </div>
                                </Card.Content>
                            </Card>
                        )
                    })
                }
                </Card.Group>
                </Grid.Row>
                <Grid.Row>
                    <Header as="h1">Orders List</Header>
                    </Grid.Row>
            </Grid>
            <Grid columns={3}>
            <DisplayOrders />
            </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        currentUser: state.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeUser: function (userId) {
            dispatch(deleteUser(userId, ownProps))
        }
    }
}

const UserListAdminContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserListAdmin))
export default UserListAdminContainer

