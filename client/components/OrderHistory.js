import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { Card, Icon, Image, Input, Button } from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const OrderHistory = (props) => {
  console.log(props.user.orders)

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
            props.user &&
            props.user.orders.filter(order => order.status !== 'active')
            .map(order => (<Link to={`/order-history/${order.id}`} key={order.id}>
                             Order Date:
                             <br />
                             {order.createdAt.slice(0, 10)}
                             <br />
                             {order.status}
                             <br />
                             <br />
                           </Link>))
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
    user: state.user
  }
}

export default withRouter(connect(mapState)(OrderHistory))
