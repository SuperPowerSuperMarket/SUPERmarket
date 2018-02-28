import React from 'react'
import {connect} from 'react-redux'
import { Grid, Image } from 'semantic-ui-react'
import { withRouter, NavLink } from 'react-router-dom'

const AllSuperpowers = (props) => {
  return (
  <Grid columns={3} divided>
  {props.superpowers.map((superpower) => {
    return (
      <Grid.Column key={superpower.id}>
      <NavLink to={`/single-superpower/${superpower.id}`}>
          <Image src={superpower.imageUrl} />
          <h2>{superpower.name}</h2>
          <h2>{superpower.description}</h2>
          </NavLink>
        </Grid.Column>
    )}
  )}
  </Grid>
)}

const mapStateToProps = (state) => {
  return {
    superpowers: state.superpowers
  }
}

const AllSuperpowersContainer = withRouter(connect(mapStateToProps)(AllSuperpowers))

export default AllSuperpowersContainer