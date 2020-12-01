import axios from 'axios'
const defaultConfig = {
    timeout: 20000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'
}
}
export function signIn(email, password) {
    return axios.post('/auth/login', {
            params: {
                email,
                password,
            },
            ...defaultConfig
    })
}

export function register(email, password) {
    return axios.post('/auth/register', {
        params: {
            email,
            password,
        },
        ...defaultConfig
    })
}

export function refreshToken(access_token) {
    return axios.post('/refresh', {
        params: {
            access_token
        },
        timeout: 20000,
        ...defaultConfig
    })
}



