import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react'

const DisplayReviews = props => {
  const currentSuperpowerId = props.currentSuperpowerId;
  const reviews = props.reviews.filter(
    review => review.superpowerId === currentSuperpowerId
  );
  return (
    <Card.Group>
      {reviews && reviews.length ? (
        reviews.map(review => {
          return (
          <div key={review.id}>
          <Card>
            <Card.Header>{review.user.fullName}</Card.Header>
            <Card.Meta textAlign="left">
            <div className="star-ratings-sprite">
              <span
                style={{ width: `${review.stars / 0.05}%` }}
                className="star-ratings-sprite-rating"
              />
            </div>
            </Card.Meta>
            <Card.Description>{review.content}</Card.Description>
            </Card>
          </div>
        )})
      ) : (
        <h2>No reviews found</h2>
      )}
    </Card.Group>
  );
};

const mapStateToProps = state => ({
  reviews: state.reviews,
  users: state.users
});

const DisplayReviewsContainer = connect(mapStateToProps)(DisplayReviews);

export default DisplayReviewsContainer;
