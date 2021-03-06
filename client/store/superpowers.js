import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SUPERPOWERS = 'GET_SUPERPOWERS'
const DELETE_SUPERPOWER = 'DELETE_SUPERPOWER'
const EDIT_SUPERPOWER = 'EDIT_SUPERPOWER'
const ADD_SUPERPOWER = 'ADD_SUPERPOWER'


/**
 * ACTION CREATORS
 */
export function getSuperpowers(superpowers) {
  const action = {type: GET_SUPERPOWERS, superpowers}
  return action
}

export function editSuperpower(superpower) {
  const action = {type: EDIT_SUPERPOWER, superpower}
  return action
}

export function addSuperpower(superpower) {
  const action = {type: ADD_SUPERPOWER, superpower}
  return action
}

export function deleteSuperpower(superpower) {
  const action = {type: DELETE_SUPERPOWER, superpower}
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
      .catch(err => console.log(err))

export const putSuperpower = (superpower, props) => {

  return dispatch => {
    const superpowerId = superpower.id
    axios.put(`/api/superpowers/${superpowerId}`, superpower)
    .then(res => res.data)
    .then(editedSuperpower => {
      dispatch(editSuperpower(editedSuperpower))
      dispatch(fetchSuperpowers())
      props.history.push(`/single-superpower/${superpower.id}`)
    })
    .catch(err => console.log(err))
  }
}

export const postSuperpower = (superpower, props) => {
  return dispatch => {
    axios.post('/api/superpowers', superpower)
      .then(res => {
        return res.data
      })
      .then(newPower => {
        dispatch(addSuperpower(newPower))
        return newPower
      })
      .then(newPower => props.history.push(`/single-superpower/${newPower.id}`))
      .catch(err => console.log(err))
  }
}

export const destroySuperpower = (superpower, props) => {
  return dispatch => {
    axios.delete(`/api/superpowers/${superpower.id}`)
      .then(res => res.data)
      .then(deletedPower => {
        dispatch(deleteSuperpower(deletedPower))
        dispatch(fetchSuperpowers())
        props.history.push(`/all-superpowers`)
      })
      .catch(err => console.log(err))
  }
}


/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {

    case GET_SUPERPOWERS:
      return action.superpowers
    case EDIT_SUPERPOWER:
      return state.map(superpower => (
        action.superpower.id === superpower.id ? action.superpower : superpower
      ))
    case DELETE_SUPERPOWER:
      return state.filter(superpower => (
        action.superpower.id !== superpower.id
      ))
    case ADD_SUPERPOWER:
      return [...state, action.superpower]

    default:
      return state
  }
}
