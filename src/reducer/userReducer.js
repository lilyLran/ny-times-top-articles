import {
    SIGN_IN_START,
    REGISTER_START,
    REGISTER, 
    SIGN_IN,
    SIGN_IN_FAILURE,
    REGISTER_FAILURE,
    REFRESHING_TOKEN,
    REFRESHING_TOKEN_DONE,
    REFRESHING_TOKEN_FAILURE
} from '../actions/userActions'

export default function user(state = {}, action) {
    switch(action.type) {
        case SIGN_IN_START:
        case REGISTER_START:
            return {...state, loading: true}
        case REGISTER: 
        case SIGN_IN:
            return {...state, ...action.payload, loading: false, error: null}
        case SIGN_IN_FAILURE:
        case  REGISTER_FAILURE:
            return {...state, ...action.payload, loading: false}
        case REFRESHING_TOKEN:
            return {...state, ...action}
        case REFRESHING_TOKEN_DONE:
            return {...state, ...action.payload, refreshTokenPromise: undefined}
        case REFRESHING_TOKEN_FAILURE:
            return {...state, ...action.payload, refreshTokenPromise: undefined}
        default:
            return state;
    }
}