import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Grid, Image, Form, Button } from 'semantic-ui-react'
import { withRouter, NavLink } from 'react-router-dom'

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
      <div style={{ marginTop: '5.5em', marginBottom: '5em', marginRight: '4em', marginLeft: '4em' }}>
        <Form style={{marginLeft: '5.5em', marginBottom: '2em'}}>
          <Form.Input
            placeholder="Search by name"
            label="Search"
            name="search"
            onChange={this.handleChange}
            value={this.state.search ? this.state.search : ''}
          />
        </Form>
        <Grid columns={8} divided style={{marginLeft: '5.5em'}}>
        {
          filteredTags.map(tag => {
            return (
              <Grid.Column key={tag}>
                <Button
                  onClick={this.handleTag}
                  value={tag}
                  color={this.state.tag === tag ? this.state.color : 'gray'}
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
        </Grid.Column>
        </Grid>
        {
          this.props.user.isAdmin ?
          (<div style={{marginBottom: '3em'}}>
          <br />
            <NavLink to="/all-superpowers/add">
              <Button color="yellow">
                Add A Superpower
              </Button>
            </NavLink>
          <br />
          </div>) : null
        }
        <Grid columns={3} divided>
        {
          this.props.superpowers.filter(superpower => {
            if (this.state.search) {
              return superpower.name.toLowerCase().includes(this.state.search.toLowerCase())
            }
            if (this.state.tag) {
              return superpower.tags.indexOf(this.state.tag) !== -1
            }
            return superpower
          })
          .map((superpower) => {
          return (
            <Grid.Column key={superpower.id} className="listing">
              <NavLink to={`/single-superpower/${superpower.id}`}>
                <Image style={{ marginBottom: '3em' }}src={superpower.imageUrl} />
                  <h2 className="listingName">{superpower.name}</h2>
                  <h3 className="listingContent">{superpower.description}</h3>
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
    superpowers: state.superpowers,
    user: state.user
  }
}

const AllSuperpowersContainer = withRouter(connect(mapStateToProps)(AllSuperpowers))

export default AllSuperpowersContainer
