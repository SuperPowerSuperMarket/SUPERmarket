import axios from 'axios'
import superpowers from './superpowers';

//Action Types
export const GET_ORDERS = 'GET_ORDERS';
const ADD_ORDER = 'ADD_ORDER';
const EDIT_ORDER = 'EDIT_ORDER';

//Action Creators
export const getOrders = orders => {
  const action = { type: GET_ORDERS, orders }
  return action
}

export const addOrder = order => {
  const action = { type: ADD_ORDER, order }
  return action;
}

export const editOrder = order => {
  const action = { type: EDIT_ORDER, order }
  return action;
}

//Thunk Creators
export const fetchOrders = () =>
  dispatch =>
    axios.get('/api/orders/user')
      .then(res => res.data)
      .then(orders => dispatch(getOrders(orders)))

export const postOrder = (userId, superpowerId, quantity, history) => dispatch =>
  axios.post('/api/orders', { userId, superpowerId, quantity })
    .then(res => {
      dispatch(addOrder(res.data))
      history.push('/cart');
    })

export const updateOrder = (userId, superpowerId, quantity, orderId, history) => dispatch =>
  axios.put(`/api/orders/${orderId}`, { userId, superpowerId, quantity })
    .then(res => {
      dispatch(editOrder(res.data))
      history.push('/cart');
    })

export const pendingOrder = (orderId, fullName, shippingAddress, history) => dispatch =>
  axios.put(`/api/orders/${orderId}/pending`, {fullName, shippingAddress})
    .then(res => {
      dispatch(editOrder(res.data))
      history.push('/payment');
    //   return axios.post('/mail')
    // .then(() => console.log('email sent'))
    })

export default function (state = [], action) {
  switch (action.type) {

    case GET_ORDERS:
      return action.orders || []

    case ADD_ORDER:
      return [...state, action.order]

    case EDIT_ORDER:
      return state.map(order => {
        return order.id === +action.order.id ?
          action.order
          : order
      })

    default:
      return state
  }
}
