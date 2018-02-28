import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Grid, Card, Image } from 'semantic-ui-react'
import { withRouter, NavLink } from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    superpowers: state.superpowers
  }
}

const AllSuperpowers = (props) => {
//   return (
//     <div>
//   {props.superpowers.superpowers.map((superpower) => {
//     return (
//       <Card key={superpower.id}>
//         <Image src={superpower.imageUrl} />
//         <Card.Content>
//           <Card.Header>
//             {superpower.name}
//           </Card.Header>
//           <Card.Meta>
//             {/* {superpower.price} */}
//           </Card.Meta>
//           <Card.Description>
//             {superpower.description}
//           </Card.Description>
//         </Card.Content>
//       </Card>
//     )}
//   )}
//   </div>
// )}
  return (
  <Grid columns={3} divided>
  {props.superpowers.superpowers.map((superpower) => {
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

const AllSuperpowersContainer = withRouter(connect(mapStateToProps)(AllSuperpowers))

export default AllSuperpowersContainer
