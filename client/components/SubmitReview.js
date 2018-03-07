import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Form, TextArea } from "semantic-ui-react";
import store, { postReview } from "../store";

class SubmitReview extends Component {
  constructor(props) {
    super(props);
    if (props.user) {
      this.state = {
        stars: 0,
        content: ""
      };
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const value = evt.target.value;
    const name =
      evt.target.name === "rating" ? +evt.target.name : evt.target.name;
    this.setState({
      [name]: value,
      dirty: true
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const userId = this.props.user.id;
    const superpowerId = +this.props.match.params.superpowerId;
    store.dispatch(
      postReview(userId, superpowerId, +this.state.stars, this.state.content)
    );
    this.props.history.push(`/single-superpower/${superpowerId}`)
  }

  render() {
    const dirty = this.state.dirty;
    const inputValue = this.state.content;
    let warning = "";
    if (!inputValue && dirty) warning = "You must enter a review!";

    return (
      <div>
        <h1>Submit a Review!</h1>
        <Form onSubmit={this.handleSubmit}>
          <h3>Select a rating</h3>
          <select id="stars" name="stars" onChange={this.handleChange}>
            <option value={5} selected="selected">5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
          <h3>Write Review Here</h3>
          <TextArea
            id="stars"
            name="content"
            onChange={this.handleChange}
            placeholder="Write review here"
          />
          {warning && <div>{warning}</div>}
        </Form>
        <Form.Button
          onClick={this.handleSubmit}
          disabled={!!warning || !inputValue}
        >
          Submit
        </Form.Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const SubmitReviewContainer = withRouter(
  connect(mapStateToProps)(SubmitReview)
);
export default SubmitReviewContainer;
