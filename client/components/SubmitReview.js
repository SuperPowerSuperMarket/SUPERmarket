import React, { Component } from "react";
import { Button, Form, Rating, TextArea } from "semantic-ui-react";

export default class SubmitReview extends Component {
  constructor() {
    super();
    this.state = {
      inputRating: 0,
      inputReview: ""
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      inputValue: value,
      dirty: true
    });
  }

  render() {
    return (
      <div>
        <h1>Submit a Review!</h1>
        <Rating icon="star" maxRating={5} />
        <Form>
          <Form.TextArea label="Review" placeholder="Write review here" />
        </Form>
        <Form>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}
