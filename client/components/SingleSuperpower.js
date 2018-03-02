import React from "react";
import { Card, Icon, Image, Input, Button, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SubmitReview from "./SubmitReview";

const SingleSuperpower = (props) => {
  const currentSuperpowerId = +props.match.params.superpowerId;
  const singlePower = props.superpowers.find(
    superpower => superpower.id === currentSuperpowerId
  );
  const reviews = props.reviews.filter(
    review => review.superpowerId === currentSuperpowerId
  )
  console.log(reviews)
  return (
    props.superpowers.length && (
      <div>
        <Grid columns={2}>
          <Grid.Column>
            <Card>
              <Image src={singlePower.imageUrl} />
              <Card.Content>
                <Card.Header>{singlePower.name}</Card.Header>
                <Card.Meta>
                  <span className="date" />
                </Card.Meta>
                <Card.Description>{singlePower.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon />
                  {"$" + singlePower.price}
                </a>
              </Card.Content>
              <Card.Content>
                <Input label="Quantity" type="number" min="0" />
              </Card.Content>
              <Card.Content>
                <Button animated="vertical">
                  <Button.Content hidden>Add</Button.Content>
                  <Button.Content visible>
                    <Icon name="shop" />
                  </Button.Content>
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <SubmitReview />
          </Grid.Column>
        </Grid>
        {reviews && reviews.length ? reviews.map((review) => (
          <div key={review.id}>
          <div className="star-ratings-sprite">
          <span style={{width: `${review.stars/.05}%`}} className="star-ratings-sprite-rating" />
          </div>
          <h2>{review.content}</h2>
          </div>))
          :
          <h2>No reviews found</h2>
        }
      </div>
    )
  )};

const mapStateToProps = state => ({
  superpowers: state.superpowers,
  reviews: state.reviews});

const SingleSuperpowerContainer = connect(mapStateToProps)(SingleSuperpower);
export default SingleSuperpowerContainer;
