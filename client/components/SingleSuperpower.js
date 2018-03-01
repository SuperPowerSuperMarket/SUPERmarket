import React from 'react'
import { Card, Icon, Image, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchSuperpower } from '../store/superpowers';
import CardContent from 'semantic-ui-react/dist/commonjs/views/Card/CardContent';


const SingleSuperpower = (props) => {
    const currentSuperpowerId = +props.match.params.superpowerId;
    const singlePower = props.superpowers.find(superpower => superpower.id === currentSuperpowerId)
    return (
        props.superpowers.length &&
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
            </Card.Content>
            <Card.Content>
                <Input label="Quantity" type="number" min="0" />
            </Card.Content>
            <Card.Content>
                <Button animated='vertical'>
                    <Button.Content hidden>Add</Button.Content>
                    <Button.Content visible>
                        <Icon name='shop' />
                    </Button.Content>
                </Button>
            </Card.Content>
        </Card>
        // <h1>yo</h1>
    )
}

const mapStateToProps = state => ({ superpowers: state.superpowers })

const SingleSuperpowerContainer = connect(mapStateToProps)(SingleSuperpower)
export default SingleSuperpowerContainer;
