import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const DisplayReviews = props => {
  const currentSuperpowerId = +props.match.params.superpowerId;
  const reviews = props.reviews.filter(
    review => review.superpowerId === currentSuperpowerId
  );
  console.log(reviews)
  return (
    <div>
      {reviews && reviews.length ? (
        reviews.map(review => (
          <div key={review.id}>
            <div className="star-ratings-sprite">
              <span
                style={{ width: `${review.stars / 0.05}%` }}
                className="star-ratings-sprite-rating"
              />
            </div>
            <h2>{review.content}</h2>
          </div>
        ))
      ) : (
        <h2>No reviews found</h2>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    reviews: state.reviews
  };
};

const DisplayReviewsContainer = withRouter(
  connect(mapStateToProps)(DisplayReviews)
);

export default DisplayReviewsContainer;
