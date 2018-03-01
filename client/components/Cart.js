import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';


const Cart = (props) => {

    return (
        <div className="ui center aligned grid">
          <Card>
              <Card.Content>
                  <Card.Header>
                      Your Cart
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

const mapStateToProps = state => ({superpowers: state.superpowers})

const CartContainer = connect(mapStateToProps)(Cart)
export default CartContainer;
