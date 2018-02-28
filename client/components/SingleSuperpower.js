import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'


const SingleSuperpower = (props) => {
    const currentSuperpowerId = this.props.match.params.superpowerId;
    console.log(currentSuperpowerId)
    const singlePower = props.superpowers.find(superpower => superpower.id === currentSuperpowerId)
    return (
        <Card>
        <Image src={singlePower.imageUrl} />
        <Card.Content>
        <Card.Header>
        {singlePower.name}
        </Card.Header>
        <Card.Meta>
        <span className='date'>
        Joined in 2015
        </span>
        </Card.Meta>
        <Card.Description>
        {singlePower.description}
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <a>
        <Icon name='user' />
        22 Friends
        </a>
        </Card.Content>
        </Card>
    )
}

const mapStateToProps = state => ({superpowers: state.superpowers})

const SingleSuperpowerContainer = withRouter(connect(mapStateToProps))(SingleSuperpower)
export default SingleSuperpowerContainer;
