import React from 'react'
import { Card, Icon, Feed, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
//import Checkout from './Checkout';
import { NavLink } from 'react-router-dom';


const Cart = (props) => {
    if (!props.orders) return <h3>There are no orders is your cart</h3>
    const activeOrder = props.orders.find(order => order.status === 'active')
    return (
        <form onSubmit={props.handleSubmit}>
      <div className="ui center aligned grid">
        <Card>
            <Card.Content>
                <Card.Header>
                    {activeOrder && activeOrder.superpowers ? `This is your cart.` : `Your cart is empty`}
                </Card.Header>
                <Card.Meta>
                  <Icon className="shopping cart huge icon" />
                </Card.Meta>
                <Card.Description>
                    {
                        activeOrder &&
                        activeOrder.superpowers &&
                        activeOrder.superpowers.map(superpower => {
                            return (
                            <Feed key={superpower.id}>
                                <Feed.Event>
                                    <Feed.Label image={superpower.imageUrl} />
                                    <Feed.Content>
                                        <Feed.Date content="SUPERpower" />
                                        <Feed.Summary>
                                            {superpower.name}
                                            <br />
                                            {'Quantity' + ': ' + superpower['order-quantity'].quantity}
                                            <br />
                                            {'Total: $' + superpower['order-quantity'].quantity * superpower.price}
                                        </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                            )
                        })
                    }

                </Card.Description>
            </Card.Content>
            <div className="ui center aligned grid" style={{marginTop: '1em', marginBottom: '1.5em'}}>
                <NavLink to={'/checkout'}>
                <Button positive animated="fade">
                    <Button.Content visible>
                        Checkout
                    </Button.Content>
                    <Button.Content hidden>
                        {activeOrder ? '$' + activeOrder.subTotal : 'Nothing in cart'}
                    </Button.Content>
                </Button>
                </NavLink>
            </div>
            <Card.Content extra />
        </Card>
      </div>
      </form>
    )
}

const mapStateToProps = state => ({superpowers: state.superpowers, user: state.user, orders: state.orders})

const CartContainer = connect(mapStateToProps)(Cart)
export default CartContainer;
