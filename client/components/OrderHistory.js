import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { Card, Icon, Image, Input, Button } from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const OrderHistory = (props) => {

  return (
    <div className="ui center aligned grid">
      <Card>
        <Card.Content className="ui center
        aligned grid">
          <h1>
            {props.user.firstName}'s
            <br />
            Order History
          </h1>
        </Card.Content>
        <Card.Content>
          {
            props.user && props.orders &&
            props.orders.filter(order => order.status !== 'active' && order.userId === props.user.id)
            .map(order => (<div key={order.id}>
                             <Link to={`/order-history/${order.id}`}>
                               Order Date:
                               <br />
                               {order.createdAt.slice(0, 10)}
                             </Link>
                             <br />
                             Status: {order.status}
                             <br />
                             Subtotal: ${order.subTotal}
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
    orders: state.orders
  }
}

export default withRouter(connect(mapState)(OrderHistory))
