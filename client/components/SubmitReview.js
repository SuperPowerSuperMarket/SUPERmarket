import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Button, Form, Rating, TextArea } from "semantic-ui-react";
import { postReview } from '../store/reviews'

class SubmitReview extends Component {
  constructor() {
    super();
    this.state = {
      inputRating: 0,
      inputReview: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      inputValue: value,
      dirty: true
    });
  }

  handleSubmit(event) {
    event.preventDefault()
    const user = this.props.user
    const superpower = +this.props.match.params.superpowerId
    const rating = document.getElementById('rating').value
    const review = event.target.review.value
    this.props.postReview(user, superpower, rating, review)
}

  render() {
    const dirty = this.state.dirty;
    const inputValue = this.state.inputValue;
    let warning = '';
    if (!inputValue && dirty) warning = 'You must enter a review';

    return (
      <div>
        <h1>Submit a Review!</h1>
        <Form onSubmit={this.handleSubmit}>
          <h3>Select a rating</h3>
          <select id="rating">
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
          <h3>Write Review Here</h3>
          <TextArea name="review" onChange={this.handleChange} placeholder="Write review here" />
        { warning && <div>{warning}</div> }
        </Form>
          <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  postReview: (userId, superpowerId, rating, review) => dispatch(postReview(userId, superpowerId, rating, review))
})

const SubmitReviewContainer = withRouter(connect( mapDispatchToProps)(SubmitReview))
export default SubmitReviewContainer;
