import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SUPERPOWERS = 'GET_SUPERPOWERS'
const REMOVE_SUPERPOWER = 'REMOVE_SUPERPOWER'
// const GET_SUPERPOWER = 'GET_SUPERPOWER'

/**
 * INITIAL STATE
 */
// const initialState = {
//   superpowers: []
// }

/**
 * ACTION CREATORS
 */
export function getSuperpowers(superpowers) {
  const action = {type: GET_SUPERPOWERS, superpowers}
  return action
}

// export function getSuperpower(superpower) {
//   const action = {type: GET_SUPERPOWER, superpower}
//   return action
// }

/**
 * THUNK CREATORS
 */
export const fetchSuperpowers = () =>
  dispatch =>
    axios.get('/api/superpowers')
      .then(res => res.data)
      .then(superpowers => dispatch(getSuperpowers(superpowers)))

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
    case GET_SUPERPOWERS:
      return action.superpowers
    default:
      return state
  }
}
