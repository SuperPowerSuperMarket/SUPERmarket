import axios from 'axios'

//Action Types
const GET_ORDERS = 'GET_ORDERS';

//Action Creators
export const getOrders = orders => {
  const action = {type: GET_ORDERS, orders}
  return action
}

//Thunk Creators
