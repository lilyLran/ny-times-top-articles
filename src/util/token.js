import jwt_decode from 'jwt-decode';
import * as localStorage from './localStorage';

const ACCESS_TOKEN_STORAGE_ID = 'session.access.tokens'
const MIN_TOKEN_LIFESPAN = 1000

export function updateSavedTokens(accessToken) {
	if (!accessToken) {
        localStorage.removeItem(ACCESS_TOKEN_STORAGE_ID)
	} else {
        const token = formatToken(accessToken);
		localStorage.setItem(ACCESS_TOKEN_STORAGE_ID, token)
	}
}

export function getSavedToken() {
    const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_ID)
    return token
}

export function shouldRefreshToken(token) {
    return token && token.expiresIn - Date.now() <= MIN_TOKEN_LIFESPAN
}

function formatToken(token) {
	const body = decodeJwt(token);
	const expiresIn = body.exp;
	return { value: token, expiresIn};
}

function decodeJwt(token){
    const decoded = jwt_decode(token);
	return decoded;
}

