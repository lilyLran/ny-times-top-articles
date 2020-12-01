import {updateSavedTokens} from '../util/token'
import {shouldRefreshToken} from '../util/token'
import {refreshToken} from '../actions/userActions'
import {
    REFRESHING_TOKEN_DONE,
    REGISTER, 
    SIGN_IN
} from '../actions/userActions'

let interval;
const TOKEN_INVALIDATION_TIME = 1000 * 60 * 2;

const userMiddleware = ({dispatch, getState}) => next => action => {
    const result = next(action);

    if (typeof action === 'function') {
        if (shouldRefreshToken(getState().user?.token)) {
            // make sure we are not already refreshing the token
            if (!getState().user.refreshTokenPromise) {
                return dispatch(refreshToken(getState().user?.token.value)).then(() => next(action));
            } else {
                return getState().user.refreshTokenPromise.then(() => next(action));
            }
        }
    }

	switch (action.type) {
        case SIGN_IN:
        case REGISTER:
        case REFRESHING_TOKEN_DONE:
                updateSavedTokens(action.payload?.access_token);
                tokenRefreshChecker(dispatch, action.payload?.access_token)
                break;
        default:    
    }

    return result;
}

function tokenRefreshChecker(dispatch, access_token) {
	if (interval) window.clearInterval(interval);
	interval = window.setInterval(() => dispatch(refreshToken(access_token)), TOKEN_INVALIDATION_TIME)
}

export default userMiddleware