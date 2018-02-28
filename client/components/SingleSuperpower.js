import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
      superpowers: state.superpowers
    }
  }

const SingleSuperpower = () => (
  <Card>
    <Image src='/assets/images/avatar/large/matthew.png' />
    <Card.Content>
      <Card.Header>
        Matthew
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          Joined in 2015
        </span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
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

const SingleSuperpowerContainer = withRouter(connect(mapStateToProps))(SingleSuperpower)
export default SingleSuperpowerContainer;
