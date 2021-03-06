import React, { Component } from 'react';
import { Card, Icon, Image, Input, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postOrder, updateOrder } from '../store';
import SubmitReview from './SubmitReview';
import DisplayReviews from './DisplayReviews';

class SingleSuperpower extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(event) {
    event.preventDefault();
    const superpower = +this.props.match.params.superpowerId;
    this.props.history.push(`/single-superpower/${superpower}/edit`);
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.props.user;
    const superpower = +this.props.match.params.superpowerId;
    const orders = this.props.orders;
    const foundOrder = orders.find(order => order.status === 'active');
    let quantity = +event.target.quant.value;
    if (!orders.length || !foundOrder) {
      this.props.postOrder(+user.id, superpower, quantity);
    } else {
      const foundQuant = this.props.orderQuantities.find(quant => {
        return quant.orderId === foundOrder.id && quant.superpowerId === superpower;
      })
      if (foundQuant) quantity += foundQuant.quantity;
      this.props.updateOrder(+user.id, superpower, quantity, foundOrder.id);
    }
  }

  render() {
    const currentSuperpowerId = +this.props.match.params.superpowerId;
    const singlePower = this.props.superpowers.find(
      superpower => superpower.id === currentSuperpowerId
    );
    const currentUser = this.props.user;

    return (
      this.props.superpowers.length && (
        <div className="ui center aligned grid">
          <Grid column={2} divided>
            <form onSubmit={this.handleSubmit}>
              <Grid.Row>
                <Card>
                  <Image src={singlePower.imageUrl} />
                  <Card.Content>
                    <Card.Header>{singlePower.name}</Card.Header>
                    <Card.Meta>
                      <span className="date" />
                    </Card.Meta>
                    <Card.Description>
                      {singlePower.description}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon />
                      {'$' + singlePower.price}
                    </a>
                  </Card.Content>
                  <Card.Content extra>
                      {
                        singlePower.stock > 0 ?
                        `In Stock: ${singlePower.stock}` :
                        'This superpower is currently unavailable.'
                      }
                  </Card.Content>
                  <Card.Content>
                    <Input
                      name="quant"
                      label="Quantity"
                      type="number"
                      min="0"
                      max={singlePower.stock}
                    />
                  </Card.Content>
                  <Card.Content>
                    <Button animated="vertical" type="submit">
                      <Button.Content hidden>Add</Button.Content>
                      <Button.Content visible>
                        <Icon name="shop" />
                      </Button.Content>
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Row>
            </form>
            {currentUser.isAdmin ? (
              <div>
                <Button onClick={this.handleEdit}>Edit</Button>
              </div>
            ) : null}
            {currentUser.email ? (
              <div>
                <SubmitReview />
              </div>
            ) : null}
            <DisplayReviews currentSuperpowerId={currentSuperpowerId} />
          </Grid>
        </div>
      )
    );
  }
}
const mapStateToProps = state => ({
  superpowers: state.superpowers,
  user: state.user,
  reviews: state.reviews,
  orders: state.orders,
  users: state.users,
  orderQuantities: state.orderQuantities
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  postOrder: (userId, superpower, quantity) =>
    dispatch(postOrder(userId, superpower, quantity, ownProps.history)),
  updateOrder: (userId, superpower, quantity, orderId) =>
    dispatch(
      updateOrder(userId, superpower, quantity, orderId, ownProps.history)
    )
});

const SingleSuperpowerContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleSuperpower)
);
export default SingleSuperpowerContainer;
