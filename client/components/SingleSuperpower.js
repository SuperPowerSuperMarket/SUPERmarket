import React, { Component } from 'react'
import { Card, Icon, Image, Input, Button, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { postOrder, updateOrder } from '../store';
import CardContent from 'semantic-ui-react/dist/commonjs/views/Card/CardContent';
import SubmitReview from './SubmitReview';
import DisplayReviews from './DisplayReviews';


class SingleSuperpower extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit(event) {
      event.preventDefault()
      console.log(this.props.history)
      const superpower = +this.props.match.params.superpowerId
      this.props.history.push(`/single-superpower/${superpower}/edit`)
    }

    handleSubmit(event) {
        event.preventDefault()
        const user = this.props.user
        const superpower = +this.props.match.params.superpowerId
        const quantity = +event.target.quant.value
        const orders = this.props.orders
        const foundOrder = orders.find(order => order.status === 'active')
        if (!orders.length || !foundOrder) {
            console.log(foundOrder)
            this.props.postOrder(+user.id, superpower, quantity)
        } else {
            this.props.updateOrder(+user.id, superpower, quantity, foundOrder.id)
        }
    }


    render() {
        const currentSuperpowerId = +this.props.match.params.superpowerId;
        const singlePower = this.props.superpowers.find(superpower => superpower.id === currentSuperpowerId)
        const reviews = this.props.reviews.filter(
          review => review.superpowerId === currentSuperpowerId
        )

        return (
            this.props.superpowers.length &&
            <div className='ui center aligned grid'>
                <Grid column={2} divided>
                <form onSubmit={this.handleSubmit}>
                <Grid.Row stretched>
                    <Card>
                        <Image src={singlePower.imageUrl} />
                        <Card.Content>
                            <Card.Header>
                                {singlePower.name}
                            </Card.Header>
                            <Card.Meta>
                                <span className='date'>
                                </span>
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
                        <Card.Content>
                            <Input name="quant" label="Quantity" type="number" min="0" />
                        </Card.Content>
                        <Card.Content>
                        <Button animated='vertical' type="submit">
                                <Button.Content hidden>Add</Button.Content>
                                <Button.Content visible>
                                    <Icon name='shop' />
                                </Button.Content>
                            </Button>
                        </Card.Content>
                        </Card>
                <SubmitReview />
                </Grid.Row>
                </form>
                </Grid>
                {reviews && reviews.length ? reviews.map((review) => (
          <div key={review.id}>
          <div className="star-ratings-sprite">
          <span style={{width: `${review.stars/.05}%`}} className="star-ratings-sprite-rating" />
          </div>
          <h2>{review.content}</h2>
          </div>))
          :
          <h2>No reviews found</h2>
        }
        {currentUser.isAdmin ?
                  (<div>
                    <Button onClick={this.handleEdit}>
                      Edit
                    </Button>
                  </div>) :
                  (null)
                }
            </div>
        )
    }
    }
const mapStateToProps = state => ({ superpowers: state.superpowers, user: state.user, reviews: state.reviews, orders: state.orders })

const mapDispatchToProps = (dispatch, ownProps) => ({
    postOrder: (userId, superpower, quantity) => dispatch(postOrder(userId, superpower, quantity, ownProps.history)),
    updateOrder: (userId, superpower, quantity, orderId) => dispatch(updateOrder(userId, superpower, quantity, orderId, ownProps.history))
})

const SingleSuperpowerContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleSuperpower))
export default SingleSuperpowerContainer;


