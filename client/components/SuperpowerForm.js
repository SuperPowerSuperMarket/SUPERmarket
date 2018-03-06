import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postSuperpower, putSuperpower, destroySuperpower } from '../store'
import { Button, Form } from 'semantic-ui-react'


class superpowerForm extends Component {

  constructor(props) {
    super(props)

    const edit = (props.match.path.indexOf('edit') !== -1)
    const id = +props.match.params.superpowerId

    if (edit) {
      const currentPower = props.superpowers.find(superpower => superpower.id === id)
      this.state = currentPower
    } else {
      this.state = {
        name: '',
        imageUrl: '',
        description: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const edit = this.props.match.path.indexOf('edit') !== -1
    const id = +this.props.match.params.superpowerId

    if (edit && nextProps !== this.props) {
      const currentPower = nextProps.superpowers.find(superpower => superpower.id === id)
      this.setState(currentPower)
    }
  }

  handleChange(event) {
    const name = event.target.name
    let value
    name === 'tags' ? value = event.target.value.split(',') : value = event.target.value

    this.setState({
      [name]: value
    })

  }

  render() {

      return (this.props.user && this.state &&
        this.props.user.isAdmin ?
        (<div className="ui center aligned grid">
          <Form onSubmit={(event) => this.props.handleSubmit(event, this.state, this.props)}>
            <Form.Field>
              <label>Superpower Name</label>
              <input
                placeholder="Name of superpower"
                name="name"
                type="text"
                required
                onChange={this.handleChange}
                value={this.state.name}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <label>Image Url</label>
              <input
                name="imageUrl"
                type="text"
                label="image url"
                onChange={this.handleChange}
                value={this.state.imageUrl}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <label>Price</label>
              <input
                placeholder="Price"
                name="price"
                type="number"
                required
                onChange={this.handleChange}
                value={this.state.price}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <label>Number in Stock</label>
              <input
                name="stock"
                label="Stock"
                type="number"
                min="0"
                onChange={this.handleChange}
                value={this.state.stock}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <label>Description</label>
              <input
                name="description"
                type="text"
                placeholder="describe your superpower"
                label="Description"
                onChange={this.handleChange}
                value={this.state.description}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <label>Tags</label>
              <input
                name="tags"
                type="text"
                placeholder="tags must be separated by commas"
                label="Tags"
                onChange={this.handleChange}
                value={this.state.tags}
              />
            </Form.Field>
            <br />
            <Button type="submit">Submit</Button>
            <Button onClick={(event) => this.props.handleDelete(event, this.state)} color="red">
              Delete Superpower
            </Button>
          </Form>
        </div>) : (<div>You are not authorized to view this page.</div>))
    }
}


const mapStateToProps = state => ({ superpowers: state.superpowers, user: state.user})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit(event, formState, props) {
      event.preventDefault()
      const edit = ownProps.match.path.indexOf('edit') !== -1

      if (edit) {
        dispatch(putSuperpower(formState, props));
      } else {
        dispatch(postSuperpower(formState, props));
      }
    },
    handleDelete(event, formState) {
      event.preventDefault()
      dispatch(destroySuperpower(formState, ownProps))
    }
  }
}

const formContainer = connect(mapStateToProps, mapDispatchToProps)(superpowerForm)
export default formContainer
