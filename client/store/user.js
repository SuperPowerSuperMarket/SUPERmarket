import axios from 'axios'
import history from '../history'
import {fetchOrders} from './orders'
import {fetchUsers} from './users'
import { create } from 'domain';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const CREATE_USER = 'CREATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user, orders: user.orders})
const removeUser = () => ({type: REMOVE_USER})
const createUser = (user) => ({type: CREATE_USER, user})

/**
 * THUNK CREATORS
 */
export const postUser = (user) =>
  dispatch =>
    axios.post('/api/users', user)
    .then(res => dispatch(createUser(res.data)))
    .catch(err => console.error(err))

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => {
        dispatch(getUser(res.data || defaultUser))
        dispatch(fetchOrders())
        dispatch(fetchUsers())
      })
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        dispatch(fetchOrders())
        dispatch(fetchUsers())
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        dispatch(fetchOrders())
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user

    case REMOVE_USER:
      return defaultUser
      
    case CREATE_USER:
      return action.user

    default:
      return state
  }
}
