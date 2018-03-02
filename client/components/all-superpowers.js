import React from 'react'
import {connect} from 'react-redux'
import { Grid, Image } from 'semantic-ui-react'
import { withRouter, NavLink } from 'react-router-dom'

const AllSuperpowers = (props) => {
  return (
  <div style={{ marginTop: '5.5em' }}>
    <Grid columns={3} divided>
    {props.superpowers.map((superpower) => {
      return (
        <Grid.Column key={superpower.id}>
          <NavLink to={`/single-superpower/${superpower.id}`}>
            <Image src={superpower.imageUrl} width="auto" height="75%" />
              <h2>{superpower.name}</h2>
              <h2>{superpower.description}</h2>
          </NavLink>
        </Grid.Column>
      )}
    )}
    </Grid>
  </div>
)}

const mapStateToProps = (state) => {
  return {
    superpowers: state.superpowers
  }
}

const AllSuperpowersContainer = withRouter(connect(mapStateToProps)(AllSuperpowers))

export default AllSuperpowersContainer
