import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Card, Grid } from "semantic-ui-react";

/**
 * COMPONENT
 */
export const OrderDetail = props => {
  const orderList = props.orders;
  const superpowers = props.superpowers;

  console.log(orderList)

  return orderList.map(order => {
    const orderId = order.id;
    const orderQuantities = props.orderQuantities.filter(
      quant => quant.orderId === orderId
    );
    const orderObjects = orderQuantities.map(quant => {
      const superpower = superpowers.find(
        orderSuperpower => quant.superpowerId === orderSuperpower.id
      );
      const quantity = quant.quantity;
      const id = quant.id;
      return { superpower, quantity, id };
    });
    return (
      <div className="ui center aligned grid" key={order.id}>
      <Grid.Column>
        <Card>
          <Card.Content
            className="ui center
        aligned grid"
          >
            <h2>
              Order Detail
              <br />
              Order #{orderId}
            </h2>
          </Card.Content>
          <Card.Content className="ui center aligned grid">
            Ordered On: {order.createdAt.slice(0, 10)}
            <br />
            Items: {orderObjects.length}
            <br />
            Status: {order.status}
          </Card.Content>
          <Card.Content>
            {orderObjects &&
              orderObjects.map(obj => (
                <div key={obj.id}>
                  <h4>
                    <Link to={`/single-superpower/${obj.superpower.id}`}>
                      Superpower: {obj.superpower.name}
                    </Link>
                    <br />
                    Quantity: {obj.quantity}
                  </h4>
                  <br />
                  <br />
                </div>
              ))}
          </Card.Content>
        </Card>
        </Grid.Column>
      </div>
    );
  });
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    orders: state.orders,
    user: state.user,
    orderQuantities: state.orderQuantities,
    superpowers: state.superpowers
  };
};

export default withRouter(connect(mapState)(OrderDetail));
