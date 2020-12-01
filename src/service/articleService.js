import axios from 'axios'
import { getSavedToken } from '../util/token'

function getConfig() {
    const config = {
        timeout: 2000,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'
        }
    }
    const token = getSavedToken()
    if (token) {
        console.log(token)
       config.headers['X-Authorization'] =`Bearer ${token.value}`
    }

    return config
}

export function getTopStories(category) {
    const section = category.toLowerCase();
 
    return axios.get(`/svc/topstories/v2/${section}.json?api-key=194hd4oiqkFKdGyApSs4srbPWAcguOU0`, {
            ...getConfig()
        })
}

export function getComments(url) {
    const config = getConfig()
    config.params = {...config.params, offset:0, url}
    return axios.get('/svc/topstories/v3/url.json?api-key=194hd4oiqkFKdGyApSs4srbPWAcguOU0', {
            ...getConfig()
    })
}

export function search(query, page=1) {
    return axios.get('/svc/search/v2/articlesearch.json?api-key=194hd4oiqkFKdGyApSs4srbPWAcguOU0',{
        params: {
            q: query,
            page
        },
        ...getConfig()
    })
}


