import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { Card, Icon, Image, Input, Button } from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const OrderDetail = (props) => {

  const orderId = +props.match.params.orderId
  const orderQuantities = props.orderQuantities.filter(quant => quant.orderId === orderId)
  const superpowers = props.superpowers
  let count = 0;
  const orderObjects = orderQuantities.map(quant => {
              const superpower = superpowers.find(superpower => quant.superpowerId === superpower.id)
              const quantity = quant.quantity
              const id = count++
              return {superpower, quantity, id}
            })
  let currentOrder
  if (props.user.orders) {
    currentOrder = props.user.orders.find(order => order.id === orderId)
    console.log({orderQuantities})
  }

  return (
    <div className="ui center aligned grid">
      <Card>
        <Card.Content className="ui center
        aligned grid">
          <h2>
            Order Detail
            <br />
            Order #{orderId}
          </h2>
        </Card.Content>
        {  currentOrder ?
          (<Card.Content className="ui center aligned grid">
            Ordered On: {currentOrder.createdAt.slice(0, 10)}
            <br />
            Items: {orderObjects.length}
            <br />
            Status: {currentOrder.status}
            </Card.Content>) : null
        }
        <Card.Content>
          {
            orderObjects &&
            orderObjects.map(obj => (<div key={obj.id}>
                                      <h4>
                                        <Link to={`/single-superpower/${obj.superpower.id}`}>
                                          Superpower: {obj.superpower.name}
                                        </Link>
                                        <br />
                                        Quantity: {obj.quantity}
                                        <br />
                                        Subtotal: ${obj.superpower.price * obj.quantity}
                                      </h4>
                                      <br />
                                      <br />
                                    </div>))
          }
        </Card.Content>
      </Card>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    orderQuantities: state.orderQuantities,
    superpowers: state.superpowers
  }
}

export default withRouter(connect(mapState)(OrderDetail))
