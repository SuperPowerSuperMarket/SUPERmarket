import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchSuperpower } from '../store/superpowers';


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
        </Card>
        // <h1>yo</h1>
    )
}

const mapStateToProps = state => ({superpowers: state.superpowers})

const SingleSuperpowerContainer = connect(mapStateToProps)(SingleSuperpower)
export default SingleSuperpowerContainer;
