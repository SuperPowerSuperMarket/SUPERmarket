import axios from 'axios'

//Initial State
// const defaultCart = []

//Action Types
const GET_ORDERS = 'GET_ORDERS';
// const GET_ORDER = 'GET_ORDER';

//Action Creators
export const getOrders = orders => {
  const action = {type: GET_ORDERS, orders}
  return action
}

//Thunk Creators
export const fetchOrders = () =>
  dispatch =>
    axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => dispatch(getOrders(orders)))

export default function (state = [], action) {
  switch (action.type) {

    case GET_ORDERS:
      return action.orders

    default:
      return state
  }
}
