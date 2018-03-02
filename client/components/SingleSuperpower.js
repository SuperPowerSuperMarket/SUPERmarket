import React, { Component } from 'react'
import { Card, Icon, Image, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchSuperpower, postOrder, updateOrder } from '../store';
import CardContent from 'semantic-ui-react/dist/commonjs/views/Card/CardContent';


class SingleSuperpower extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()
        const user = this.props.user
        const superpower = +this.props.match.params.superpowerId
        const quantity = +event.target.quant.value
        const foundOrder = user.orders.find(order => order.status === 'active')
        if (!user.orders.length || !foundOrder) {
            this.props.postOrder(+user.id, superpower, quantity)
        } else {
            this.props.updateOrder(+user.id, superpower, quantity, foundOrder.id)
        }
        
    }


    render() {
        const currentSuperpowerId = +this.props.match.params.superpowerId;
        const singlePower = this.props.superpowers.find(superpower => superpower.id === currentSuperpowerId)

       
        return (
            this.props.superpowers.length &&
            <div className='ui center aligned grid'>
                <form onSubmit={this.handleSubmit}>
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
                        
                </form>
            </div>
        )
    }
    }
const mapStateToProps = state => ({ superpowers: state.superpowers, user: state.user })

const mapDispatchToProps = (dispatch, ownProps) => ({
    postOrder: (userId, superpower, quantity) => dispatch(postOrder(userId, superpower, quantity, ownProps.history)),
    updateOrder: (userId, superpower, quantity, orderId) => dispatch(updateOrder(userId, superpower, quantity, orderId, ownProps.history))
})

const SingleSuperpowerContainer = connect(mapStateToProps, mapDispatchToProps)(SingleSuperpower)
export default SingleSuperpowerContainer;


