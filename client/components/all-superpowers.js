import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Grid, Image, Form, Button } from 'semantic-ui-react'
import { withRouter, NavLink } from 'react-router-dom'

<<<<<<< HEAD
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
=======
class AllSuperpowers extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.handleChange = this.handleChange.bind(this)
    this.handleTag = this.handleTag.bind(this)
    this.handleClearTags = this.handleClearTags.bind(this)
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    })
  }

  handleTag(event) {
    event.preventDefault()
    this.setState({
      tag: event.target.value,
      color: 'green'
    })
    console.log(this.state)
  }

  handleClearTags(event) {
    event.preventDefault()
    this.setState({
      tag: ''
    })
  }

  render() {
    let allTags = []
    this.props.superpowers.forEach(superpower => {
      return superpower.tags.forEach(tag => allTags.push(tag))
    })
    const filteredTags = allTags.filter((el, index, self) => self.indexOf(el) === index)

    return (
      <div text style={{ marginTop: '5.5em' }}>
        <Form text style={{marginLeft: '5.5em', marginBottom: '2em'}}>
          <Form.Input
            placeholder="Search by name"
            label="Search"
            name="search"
            onChange={this.handleChange}
            value={this.state.search ? this.state.search : ''}
          />
        </Form>
        <Grid columns={8} divided text style={{marginLeft: '5.5em'}}>
        {
          filteredTags.map(tag => {
            return (
              <Grid.Column key={tag}>
                <Button
                  onClick={this.handleTag}
                  value={tag}
                  color={this.state.tag === tag ? this.state.color : "gray"}
                >
                  {tag}
                </Button>
              </Grid.Column>
            )
          })
        }
        <Grid.Column>
          <Button
            onClick={this.handleClearTags}
            color="blue"
          >
            Clear Tag
          </Button>
>>>>>>> master
        </Grid.Column>
        </Grid>
        <Grid columns={3} divided>
        {
          this.props.superpowers.filter(superpower => {
            if (this.state.search) {
              return superpower.name.toLowerCase().includes(this.state.search)
            }
            if (this.state.tag) {
              return superpower.tags.indexOf(this.state.tag) !== -1
            }
            return superpower
          })
          .map((superpower) => {
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
      </div>)
  }

}

const mapStateToProps = (state) => {
  return {
    superpowers: state.superpowers
  }
}

const AllSuperpowersContainer = withRouter(connect(mapStateToProps)(AllSuperpowers))

export default AllSuperpowersContainer
