import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SUPERPOWERS = 'GET_SUPERPOWERS'
const REMOVE_SUPERPOWER = 'REMOVE_SUPERPOWER'

/**
 * INITIAL STATE
 */
const initialState = {
  superpowers: []
}

/**
 * ACTION CREATORS
 */
export function getSuperpowers(superpowers) {
  const action = {type: GET_SUPERPOWERS, superpowers}
  return action
}

/**
 * THUNK CREATORS
 */
export const fetchSuperpowers = () =>
  dispatch =>
    axios.get('/api/superpowers')
      .then(res => res.data)
      .then(superpowers => dispatch(getSuperpowers(superpowers)))

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUPERPOWERS:
      return Object.assign({}, state, {superpowers: action.superpowers})
    default:
      return state
  }
}
