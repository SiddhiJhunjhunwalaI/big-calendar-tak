import {
    AUTH_ERROR,
    REGISTERED,
    SET_CURRENT_USER,
    PASSWORD_RESET_ERROR,
    PASSWORD_RESET,
    PASSWORD_GENERATED,
    PASSWORD_GENERATED_ERROR,
    AUTH_LOADER,
    LOGOUT_USER,
    CLEAR_PREV_OUTPUT
    
} from '../actions/index'

const INITIAL_STATE = {
    authError: null,
    registered: false,
    currentUser: null,
    authenticated: false,
    passwordResetError: false,
    passwordSuccess: false,
    passowrdGenerated: false,
    passwordGenerateError: false,
    authLoader: false
    
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case AUTH_ERROR:
            return { ...state, authError: action.payload, authLoader: false }
        case REGISTERED:
            return { ...state, registered: true, authLoader: false }
        case SET_CURRENT_USER:
            return { ...state, authenticated: true, currentUser: action.payload, authLoader: false }
        case PASSWORD_RESET_ERROR:
            return { ...state, passwordResetError: action.payload }
        case PASSWORD_RESET:
            return { ...state, passwordSuccess: true }
        case CLEAR_PREV_OUTPUT:
            return {...state,passwordResetError:null,passwordSuccess:null,registered:false}
        case PASSWORD_GENERATED:
            return { ...state, passowrdGenerated: true }
        case PASSWORD_GENERATED_ERROR:
            return { ...state, passwordGenerateError: action.payload }
        case AUTH_LOADER:
            return { ...state, authLoader: true, authError: false }
            case LOGOUT_USER:
                return{...state,authenticated:false,currentUser:null}
        default:
            return state
    }
}

export default reducer
