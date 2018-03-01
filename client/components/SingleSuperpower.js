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
        <div text style={{ marginTop: '7em' }} className='ui center aligned grid'>
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
            </Card>
        </div>
    )
}

const mapStateToProps = state => ({superpowers: state.superpowers})

const SingleSuperpowerContainer = connect(mapStateToProps)(SingleSuperpower)
export default SingleSuperpowerContainer;
