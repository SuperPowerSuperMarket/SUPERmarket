import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import superpowers from './superpowers'
import orders from './orders'
import orderQuantities from './order-quantities'

const reducer = combineReducers({user, superpowers, orders, orderQuantities})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './users'
export * from './superpowers'
export * from './orders'
export * from './order-quantities'
