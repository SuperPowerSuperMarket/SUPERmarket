import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'
const REMOVE_SUPERPOWER = 'REMOVE_SUPERPOWER'
// const GET_SUPERPOWER = 'GET_SUPERPOWER'

/**
 * INITIAL STATE
 */
// const initialState = []

/**
 * ACTION CREATORS
 */
export function getReviews(reviews) {
  const action = {type: GET_REVIEWS, reviews}
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

// export const fetchSuperpower = (superpowerId) =>
//   dispatch =>
//     axios.get(`/api/superpowers/${superpowerId}`)
//     .then(res => res.data)
//     .then(dispatch(getSuperpower(superpowerId)))


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    default:
      return state
  }
}
