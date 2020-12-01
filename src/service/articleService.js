import axios from 'axios'
import { getSavedToken } from '../util/token'

function getConfig() {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'
    }
    const token = getSavedToken()
    if (token) {
        headers = {...headers, 'X-Authorization': `Bearer ${token.value}`}
    }
    
    return {
        timeout: 2000,
        headers
    }
}

const apiKey='194hd4oiqkFKdGyApSs4srbPWAcguOU0'

export function getTopStories(category) {
    const section = category.toLowerCase();
 
    return axios.get(`/svc/topstories/v2/${section}.json?api-key=${apiKey}`, {
            ...getConfig()
        })
}

export function getComments(url) {
    const config = getConfig()
    config.params = {...config.params, offset:0, url}
    return axios.get(`/svc/topstories/v3/url.json?api-key=${apiKey}`, {
            ...getConfig()
    })
}

export function search(query, page=1) {
    const token = getSavedToken()
    return axios.get(`/svc/search/v2/articlesearch.json?api-key=${apiKey}`,{
        params: {
            q: query,
            page
        },
        timeout: 20000,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
          'X-Authorization': `Bearer ${token.value}`
    }})
}


