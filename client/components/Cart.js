import React from 'react'
import { Card, Icon, Feed, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'


const Cart = (props) => {
    // if (props.orders) {
    //   console.log(props.orders)
    // } else {
    //   console.log('get cart by session')
    // }
    if (!props.orders) return <h3>There are no orders is your cart</h3>
    const activeOrder = props.orders.find(order => order.status === 'active')
    // let totals

    // activeOrder ?
    // totals = activeOrder.superpowers.map(superpower => superpower['order-quantity'].quantity * superpower.price) :


    // totals ? const totalPrice = totals.reduce((accu, value) => accu + value)
    // console.log(activeOrder)
    // console.log(props.orders)

    //if the orders array is empty, tell the logged in user that the cart is empty
    //if the orders array is not, if orders.find by status 'active' render the items in the active order
    return (
      <div className="ui center aligned grid">
        <Card>
            <Card.Content>
                <Card.Header>

                    {activeOrder && activeOrder.id ? `${props.user.firstName},  this is your cart.` : `Your cart is empty`}
                </Card.Header>
                <Card.Meta>
                  <Icon className="shopping cart huge icon" />
                </Card.Meta>
                <Card.Description>
                    {
                        activeOrder &&
                        activeOrder.id &&
                        activeOrder.superpowers.map(superpower => {
                            return (
                            <Feed key={superpower.id}>
                                <Feed.Event>
                                    <Feed.Label image={superpower.imageUrl} />
                                    <Feed.Content>
                                        <Feed.Date content='SUPERpower' />
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
            <div className="ui center aligned grid" text style={{marginTop: '1em', marginBottom: '1.5em'}}>
                <Button positive animated='fade'>
                    <Button.Content visible>
                        Checkout
                    </Button.Content>
                    <Button.Content hidden>
                        {'$'}
                    </Button.Content>
                </Button>
            </div>
            <Card.Content extra />
        </Card>
      </div>
    )
}

const mapStateToProps = state => ({superpowers: state.superpowers, user: state.user, orders: state.orders})

// const mapDispatchToProps = dispatch => {
//   return {
//     handleCartOrder:
//   }
// }

const CartContainer = connect(mapStateToProps)(Cart)
export default CartContainer;
