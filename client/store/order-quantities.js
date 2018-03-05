import axios from 'axios'

export const GET_ORDER_QUANTS = 'GET_ORDER_QUANTS';

export const getOrderQuants = quants => {
  const action = {type: GET_ORDER_QUANTS, quants}
  return action
}

export const fetchOrderQuants = () =>
  dispatch =>
    axios.get('/api/order-quantities')
      .then(res => res.data)
      .then(quants => dispatch(getOrderQuants(quants)))

export default function (state = [], action) {
  switch (action.type) {

    case GET_ORDER_QUANTS:
      return action.quants || []

    default:
      return state
  }
}
