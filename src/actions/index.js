import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { socket } from "../App";

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const AUTH_ERROR = 'AUTH_ERROR'
export const LOGOUT_USER = 'LOGOUT_USER'

export const AUTH_LOADER = 'AUTH_LOADER'

export const REGISTERED = 'REGISTERED'

export const PASSWORD_RESET = 'PASSWORD_RESET'
export const PASSWORD_RESET_ERROR = 'PASSWORD_RESET_ERROR'

export const PASSWORD_GENERATED = 'PASSWORD_GENERATED'
export const PASSWORD_GENERATED_ERROR = 'PASSWORD_GENERATED_ERROR'

export const SET_USER_DETAILS='SET_USER_DETAILS'
export const CLEAR_PREV_OUTPUT='CLEAR_PREV_OUTPUT'


export const BASE_URL_SOCKET = 'http://localhost:3000'
// export const BASE_URL_SOCKET = 'https://pure-citadel-59157.herokuapp.com'
// export const BASE_URL_SOCKET='https://boiling-fortress-58506.herokuapp.com'

export const registerUser = (values) => (dispatch) => {
    console.log('values', values)
    dispatch({ type: AUTH_LOADER, payload: true })
    const { email, fullName, password, confirm_password } = values

    axios
        .post(`/api/users/register`, { name: fullName, email, password, confirm_password })
        .then((res) => dispatch({ type: REGISTERED }))
        .catch((err) => dispatch({ type: AUTH_ERROR, payload: err }))
}

export const clearPrev = () => (dispatch) => {
    dispatch({ type: CLEAR_PREV_OUTPUT})
}
export const loginUser = ({ email, password }) => (dispatch) => {
    dispatch({ type: AUTH_LOADER, payload: true })
    axios
        .post(`/api/users/login`, { email, password })
        .then((res) => {
            const { token } = res.data
            localStorage.setItem('jwtToken', token)
            setAuthToken(token)

            //decode token to get user data and set current user
            dispatch({ type: SET_CURRENT_USER, payload: jwt_decode(token) })
        })
        .catch((err) => dispatch({ type: AUTH_ERROR, payload: err.response.data }))
}

export const setCurrentUser = (decoded) => (dispatch) => {
    dispatch({ type: SET_CURRENT_USER, payload: decoded })
}

export const resetPassword = ({ email }) => (dispatch) => {
    axios
        .post(`/api/users/reset-password`, { email })
        .then((res) => dispatch({ type: PASSWORD_RESET }))
        .catch((err) => dispatch({ type: PASSWORD_RESET_ERROR, payload: err.response.data }))
}

export const generateNewPassword = ({ email, password, confirm_password }) => (dispatch) => {
    axios
        .post(`/api/users/generate-password`, { email, password, confirm_password })
        .then((res) => dispatch({ type: PASSWORD_GENERATED }))
        .catch((err) => dispatch({ type: PASSWORD_GENERATED_ERROR, payload: err.response.data }))
}

//logout user
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    socket.disconnect();
    dispatch({ type: LOGOUT_USER })
}

export const submitEvent = ({ title, email, descriptiom, startTime, endTime, fullName, phoneNumber }) => async (
    dispatch
) => {
    console.log({
        title,
        email,
        descriptiom,
        startTime,
        endTime,
        fullName,
        phoneNumber
    })
}

export const getuserDetails = () => async (
    dispatch
) => {
    
   console.log("wired")
    
}
