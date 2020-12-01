import * as userService from '../service/userService'
import { history } from '../util/history'

export const SIGN_IN_START = 'user/SIGN_IN_START'
export const SIGN_IN = 'user/SIGN_IN'
export const SIGN_IN_FAILURE = 'user/SIGN_IN_FAILURE'
export const REGISTER_START = 'user/REGISTER_START'
export const REGISTER = 'user/REGISTER'
export const REGISTER_FAILURE = 'user/REGISTER_FAILURE'
export const INIT_TOKENS ='user/INIT_TOKENS'
export const REFRESHING_TOKEN = 'user/REFRESHING_TOKEN'
export const REFRESHING_TOKEN_DONE = 'user/REFRESHING_TOKEN_DONE'
export const REFRESHING_TOKEN_FAILURE = 'user/REFRESHING_TOKEN_FAILURE'

export function signIn(email, password, from) {
    return dispatch => {
        dispatch({ type: SIGN_IN_START, payload: email })
       return userService.signIn(email, password)
            .then(
                res => { 
                    history.push(from)
                    return dispatch({ type: SIGN_IN, payload: {...res.data, email, password }})
                },
                err => {
                    const error = err?.response?.data
                    dispatch({ type: SIGN_IN_FAILURE, payload: { error, email, password } })
                    return Promise.reject(error)
                }
            )
    };
}


export function register(email, password, from) {
    return dispatch => {
        dispatch({ type: REGISTER_START, payload: email })
        return userService.register(email, password)
            .then(
                res => { 
                    history.push(from);
                    dispatch({ type: REGISTER, payload:  { ...res.data, email, password } })
                   
                },
                err => {
                    const error = err?.response?.data
                    dispatch({ type: REGISTER_FAILURE, payload:  { error, email, password } })
                }
            );
    };
}

export function refreshToken(access_token) {
    return dispatch => {
        const refreshTokenPromise =  userService.refreshToken(access_token).then(
            res => {
                dispatch({type: REFRESHING_TOKEN_DONE, payload: {...res.data}})
                return Promise.resolve(res.data.access_token)
            },
            err => {
                const error = err?.response?.data
                dispatch({type: REFRESHING_TOKEN_FAILURE, payload: {error}})
                return Promise.reject({error})
            }
        )
        dispatch({
            type: REFRESHING_TOKEN,
    
            // we want to keep track of token promise in the state so that we don't try to refresh
            // the token again while refreshing is in process
            refreshTokenPromise
        });
    }
}

export function initTokens(token) {
	return { type: INIT_TOKENS, payload: { access_token: token } };
}
