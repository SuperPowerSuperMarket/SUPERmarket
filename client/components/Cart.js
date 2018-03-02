import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'


const Cart = (props) => {
    // if (props.orders) {
    //   console.log(props.orders)
    // } else {
    //   console.log('get cart by session')
    // }
    console.log(props)

    //if the orders array is empty, tell the logged in user that the cart is empty
    //if the orders array is not, if orders.find by status 'active' render the items in the active order

    return (
      <div className="ui center aligned grid">
        <Card>
            <Card.Content>
                <Card.Header>
                    {props.user.firstName ? `${props.user.firstName},  your cart is empty.` : `Your cart is empty`}
                </Card.Header>
                <Card.Meta>
                  <Icon className="shopping cart huge icon" />
                </Card.Meta>
                <Card.Description>
                    Your cart is currently empty.
                </Card.Description>
            </Card.Content>
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
