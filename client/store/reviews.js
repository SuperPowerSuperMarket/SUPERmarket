import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'
const REMOVE_SUPERPOWER = 'REMOVE_SUPERPOWER'
// const GET_SUPERPOWER = 'GET_SUPERPOWER'

/**
 * INITIAL STATE
 */
// const initialState = []

/**
 * ACTION CREATORS
 */
function getReviews(reviews) {
  const action = {type: GET_REVIEWS, reviews}
  return action
}

function addReview(review){
  const action = {type: ADD_REVIEW, review}
  return action
}

// export function getSuperpower(superpower) {
//   const action = {type: GET_SUPERPOWER, superpower}
//   return action
// }

/**
 * THUNK CREATORS
 */
export const fetchReviews = () =>
  dispatch =>
    axios.get('/api/reviews')
      .then(res => res.data)
      .then(reviews => dispatch(getReviews(reviews)))

export const postReview = () =>
  dispatch =>
    axios.post('/api/reviews')
    .then(res => res.data)
    .then(review => dispatch(addReview(review)))


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case ADD_REVIEW:
      return action.review
    default:
      return state
  }
}
