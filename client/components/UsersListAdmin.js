import React from 'react'
import { Button, Form, Feed, Card, Grid } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';

const UserListAdmin = (props) => {
    let otherUsers;
    if (props.users && props.currentUser) {
        otherUsers = props.users.filter(user => user.id !== props.currentUser.id)
    }
    if (otherUsers) {
        console.log(otherUsers)
    }
    console.log(props.currentUser)
    console.log(props.users)
    return (
        otherUsers &&
        <Grid column={2} divided className="ui center aligned grid">
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
                                <div className='ui two buttons'>
                                    <Link to={`/edit-user/${user.id}`}>
                                        <Button basic color='green'>Edit</Button>
                                    </Link>
                                    <Button basic color='red'>Delete</Button>
                                </div>
                            </Card.Content>
                        </Card>
                    )
                })
            }
            </Card.Group>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        users: state.users,
        currentUser: state.user
    }
}

const UserListAdminContainer = withRouter(connect(mapStateToProps)(UserListAdmin))
export default UserListAdminContainer

