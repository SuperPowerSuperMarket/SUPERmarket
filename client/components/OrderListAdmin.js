import React from 'react'
import { Button, Form, Feed, Card, Grid } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteUser } from '../store/users'

const OrderListAdmin = (props) => {
    let orders;
    if (props.users && props.currentUser) {
        orders = props.orders
    }
    console.log(orders)

    return (
        orders &&
        <Grid column={2} divided className="ui center aligned grid">
            <Card.Group>
            {
                orders.map(order => {
                    return (
                        <Card key={order.id}>
                            <Card.Content>
                                <Card.Header>
                                  Ordered By:
                                  {props.users.find(user => user.id === order.userId).name}
                                </Card.Header>
                                <Card.Description>
                                    Order created at {order.createdAt.slice(0, 10)}
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                <div className="ui two buttons">
                                    <Link to={`/edit-order/${order.id}`}>
                                        <Button basic color="green">Edit</Button>
                                    </Link>
                                    <Button onClick={() => props.removeorder(order.id)} basic color="red">Delete</Button>
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeUser: function (orderId) {
            dispatch(deleteOrder(orderId, ownProps))
        }
    }
}

const UserListAdminContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderListAdmin))
export default UserListAdminContainer

