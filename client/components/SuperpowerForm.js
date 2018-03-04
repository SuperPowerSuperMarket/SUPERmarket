import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import store, { fetchSuperpowers, postSuperpower, putSuperpower } from '../store'
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
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const edit = this.props.match.path.indexOf('edit') !== -1

    if (edit) {
      event.preventDefault();
      const putSuperpowerThunk = putSuperpower(this.state, this.props);
      store.dispatch(putSuperpowerThunk);
    } else {
      event.preventDefault();
      const newSuperpowerThunk = postSuperpower(this.state, this.props);
      store.dispatch(newSuperpowerThunk);
      store.dispatch(fetchSuperpowers());
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
                value={this.state.name ? this.state.name : ''}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <input
                name="imageUrl"
                label="image url"
                onChange={this.handleChange}
                value={this.state.imageUrl ? this.state.imageUrl : ''}
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
                value={this.state.price ? this.state.price : ''}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <input
                name="stock"
                label="Stock"
                type="number"
                min="0"
                onChange={this.handleChange}
                value={this.state.stock ? this.state.stock : ''}
              />
            </Form.Field>
            <br />
            <Button type="submit">Submit</Button>
          </Form>
        </div>) : (<div>You are not. </div>))
    }
}


const mapStateToProps = state => ({ superpowers: state.superpowers, user: state.user})

const formContainer = connect(mapStateToProps)(superpowerForm)
export default formContainer
