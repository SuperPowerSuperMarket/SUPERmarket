import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Grid, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    superpowers: state.superpowers
  }
}

const AllSuperpowers = (props) => {
  console.log(props)
  return (
  <Grid columns='three' divided>
  {props.superpowers.superpowers.map((superpower) => {
    return (
      <Grid.Row key={superpower.id}>
        <Grid.Column>
        <Image src={superpower.imageUrl} />
      </Grid.Column>
      <Grid.Column>
        <h1>{superpower.name}</h1>
      </Grid.Column>
      <Grid.Column>
        <h1>{superpower.description}</h1>
      </Grid.Column>
    </Grid.Row>
    )
  })
  }
  </Grid>
  )}

const AllSuperpowersContainer = withRouter(connect(mapStateToProps)(AllSuperpowers))

export default AllSuperpowersContainer
