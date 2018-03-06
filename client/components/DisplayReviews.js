import React, { Component } from "react";
import { connect } from "react-redux";

const DisplayReviews = props => {
  const currentSuperpowerId = props.currentSuperpowerId;
  const reviews = props.reviews.filter(
    review => review.superpowerId === currentSuperpowerId
  );
  const users = props.users;
  const authorArr = users.filter(user => user.id === review.userId);
  console.log(users)
  return (
    <div>
      {reviews && reviews.length ? (
        reviews.map(review => {
          console.log(users.find(user => user.id === review.userId))
          return (
          <div key={review.id}>
            <div className="star-ratings-sprite">
              <span
                style={{ width: `${review.stars / 0.05}%` }}
                className="star-ratings-sprite-rating"
              />
            </div>
            <h2>By {review.user.fullName}</h2>
            <h2>{review.content}</h2>
          </div>
        )})
      ) : (
        <h2>No reviews found</h2>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  reviews: state.reviews,
  users: state.users
});

const DisplayReviewsContainer = connect(mapStateToProps)(DisplayReviews);

export default DisplayReviewsContainer;
