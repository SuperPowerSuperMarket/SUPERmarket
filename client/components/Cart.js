import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';


const Cart = (props) => {

    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    Hello Header
                </Card.Header>
                <Card.Meta>
                  Card Meta
                </Card.Meta>
                <Card.Description>
                    Card Description
                </Card.Description>
            </Card.Content>
            <Card.Content extra />
        </Card>
    )
}

const mapStateToProps = state => ({superpowers: state.superpowers})

const CartContainer = connect(mapStateToProps)(Cart)
export default CartContainer;
