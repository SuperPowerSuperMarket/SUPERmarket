import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import store, { fetchSuperpowers, postSuperpower, putSuperpower, destroySuperpower } from '../store'
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
      this.state = {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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

  handleSubmit(event) {
    event.preventDefault()
    const edit = this.props.match.path.indexOf('edit') !== -1

    if (edit) {
      const putSuperpowerThunk = putSuperpower(this.state, this.props);
      store.dispatch(putSuperpowerThunk);
    } else {
      const newSuperpowerThunk = postSuperpower(this.state, this.props);
      store.dispatch(newSuperpowerThunk);
      store.dispatch(fetchSuperpowers());
    }
  }

  handleDelete(event) {
    event.preventDefault()
    const edit = this.props.match.path.indexOf('edit') !== -1
    console.log('delete clicked', this.state)

    if (edit) {
      const deletePowerThunk = destroySuperpower(this.state, this.props)
      store.dispatch(deletePowerThunk)
    }
  }

  render() {

      return (this.props.user && this.state &&
        this.props.user.isAdmin ?
        (<div className="ui center aligned grid">
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Superpower Name</label>
              <input
                placeholder="Name of superpower"
                name="name"
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
              <label>Tags</label>
              <input
                name="tags"
                placeholder="tags must be separated by commas"
                label="Tags"
                onChange={this.handleChange}
                value={this.state.tags}
              />
            </Form.Field>
            <br />
            <Button type="submit">Submit</Button>
            <Button onClick={this.handleDelete} color="red">
              Delete Superpower
            </Button>
          </Form>
        </div>) : (<div>You are not authorized to view this page.</div>))
    }
}


const mapStateToProps = state => ({ superpowers: state.superpowers, user: state.user})

const formContainer = connect(mapStateToProps)(superpowerForm)
export default formContainer
