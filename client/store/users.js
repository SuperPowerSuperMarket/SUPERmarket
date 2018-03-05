import axios from 'axios'
import {me} from './user'
import history from '../history'

const GET_USERS = 'GET_USERS'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'

const getUsers = users => ({type: GET_USERS, users})
const updateUser = user => ({type: UPDATE_USER, user})
const removeUser = user => ({type: DELETE_USER, user})

export const fetchUsers = () =>
    dispatch =>
        axios.get('/api/users')
        .then(res => res.data)
        .then(users => dispatch(getUsers(users)))

export const putUser = (user, ownProps) =>
    dispatch =>
        axios.put(`/api/users/${user.id}`, user.fields)
        .then(res => res.data)
        .then(updatedUser => {
            dispatch(updateUser(updatedUser))
            dispatch(fetchUsers())
            dispatch(me())
        })
        // .then(() => ownProps.history.push('/users-list'))

export const deleteUser = (userId, ownProps) =>
    dispatch =>
        axios.delete(`/api/users/${userId}`)
        .then(user => {
            dispatch(removeUser(user))
            dispatch(fetchUsers())
        })
        .then(() => ownProps.history.push('/users-list'))


export default function (state = [], action) {
    switch (action.type) {
        case GET_USERS:
            return action.users

        case UPDATE_USER:
            return state.map(user => user.id === action.user.id ? action.user : user)

        case DELETE_USER:
            return state.filter(user => user.id !== action.user.id)
        
        default:
            return state
    }
}
