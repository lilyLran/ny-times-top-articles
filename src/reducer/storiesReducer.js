import getRecentSearches from '../util/search'
import {
    GET_TOP_STORIES,
    GET_TOP_STORIES_START,
    GET_TOP_STORIES_FAILURE,
    SEARCH_START,
    SEARCH_DONE,
    SEARCH_FAILURE,
    GET_COMMENT_START,
    GET_COMMENT_DONE,
    GET_COMMENT_FAILURE,
    VIEW_DETAIL_ARTICLE,
    SET_ACTIVE_PAGE,
    VIEW_CATEGORY_NEWS
} from '../actions/newsActions'

export const SEARCH_RESULTS_CACHE_LIMIT = 10;
export default function stories(state = {}, action) {
    switch(action.type) {
        case VIEW_CATEGORY_NEWS: 
            return {
                ...state,
                'current_category': action.payload.category
            }
        case GET_TOP_STORIES_START: 
        case GET_TOP_STORIES_FAILURE:
        case GET_TOP_STORIES:
        {
            const {sectionId, payload} = action
            return {
                ...state,
                [sectionId]:{
                   ...payload
                }
            }
        }
        case VIEW_DETAIL_ARTICLE:
            return {
                ...state,
                'current_selected_article': {
                    ...action.payload.article
                }
            }
        default:
            return state
    }
}

const initState = {
    recentSearches: getRecentSearches(),
    result: {},
    meta: {},
    currentPage: 0
}

export function search(state = initState, action) {
    switch(action.type) {
        case SEARCH_START: 
            return reduceSearchStart(state, action)
        case SEARCH_DONE:
            return reduceSearchDone(state, action)
        case SEARCH_FAILURE:
            return reduceSearchFailure(state, action)
        case SET_ACTIVE_PAGE: 
            return {
                ...state,
                currentPage:action.payload.page
            }
        default:
    }

    return state
}

export function comments(state = {}, action) {
    switch(action.type) {
        case GET_COMMENT_START:
        case GET_COMMENT_DONE:
        case GET_COMMENT_FAILURE:
        {
            const {url, payload} = action

            return {
                ...state,
                [url]:{
                   ...payload
                }
            }
        }
        default:
            return state
    }
}

function reduceSearchStart(state, action) {
    const { query, page} = action.payload
	if (!query) return state;
	const recentSearches = state.recentSearches.slice();
	// remove the query from the list if it exists already
	const existingIndex = recentSearches.indexOf(query);
	if (~existingIndex) recentSearches.splice(existingIndex, 1);
	// add the query to the beginning of the list
	const length = recentSearches.unshift(query);
	// trim list down to a maximum of 5 entries
    if (length > 5) recentSearches.splice(5, length - 5);

    const result = state.result || {}

    return {
        ...state,
        query,
        currentPage: page,
        meta: {},
        recentSearches: [...recentSearches],
        result: {
            ...result,
            [page]: {
                loading: true, 
            }
        }
    }
}

function reduceSearchDone(state, action) {
    const {query, docs, meta, page} = action.payload
    if (state.query !== query) return state

    const result = state.result || {}

    return {
        ...state,
        meta,
        result: {
            ...result,
            [page]: {
                loading: false, 
                list: [...docs]
            }
        }
    }
}

function reduceSearchFailure(state, action) {
    const {query, error, page} = action.payload;
    if (state.query !== query) return state
    const result = state.result || {}
    return {
        ...state,
        result: {
            ...result,
            [page]: {
                loading: false, 
                error
            }
        }
    }
}
