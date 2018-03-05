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
  const orderObjects = orderQuantities.map(quant => {
              const superpower = superpowers.find(superpower => quant.superpowerId === superpower.id).name
              const quantity = quant.quantity
              const id = quant.id
              return {superpower, quantity, id}
            })
  const currentOrder = props.user.orders.find(order => order.id === orderId)

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
        <Card.Content className="ui center aligned grid">
          Ordered On: {currentOrder.createdAt.slice(0, 10)}
          <br />
          Items: {orderObjects.length}
        </Card.Content>
        <Card.Content>
          {
            orderObjects &&
            orderObjects.map(obj => (<div key={obj.id}>
                                      <h4>
                                        Superpower: {obj.superpower}
                                        <br />
                                        Quantity: {obj.quantity}
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
