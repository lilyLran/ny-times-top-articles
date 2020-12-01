import * as service from '../service/articleService'

export const PAGE_CHANGE = 'page/PAGE_CHANGE'
export const GET_TOP_STORIES_START = 'page/GET_TOP_STORIES_START'
export const GET_TOP_STORIES = 'page/GET_TOP_STORIES'
export const GET_TOP_STORIES_FAILURE = 'page/GET_TOP_STORIES_FAILURE'
export const GET_COMMENT_START = 'page/GET_COMMENT_START'
export const GET_COMMENT_DONE = 'page/GET_COMMENT_DONE'
export const GET_COMMENT_FAILURE = 'page/GET_COMMENT_FAILURE'
export const SEARCH_START = 'page/SEARCH_START'
export const SEARCH_DONE = 'page/SEARCH_DONE'
export const SEARCH_FAILURE = 'page/SEARCH_FAILURE'
export const VIEW_DETAIL_ARTICLE = 'page/VIEW_DETAIL_ARTICLE'
export const SET_ACTIVE_PAGE = 'page/SET_ACTIVE_PAGE'
export const VIEW_CATEGORY_NEWS = 'VIEW_CATEGORY_NEWS'


export function getCategorizedNews(category) {
    return (dispatch) => {
            dispatch({type: VIEW_CATEGORY_NEWS, payload: {category}})
            const sectionId = category || 'home'
            dispatch({type: GET_TOP_STORIES_START, sectionId, payload: {loading: true} });
            return service.getTopStories(sectionId).then(
                response => {
                    console.log('category', sectionId,  response)
                    dispatch({
                        type: GET_TOP_STORIES,
                        sectionId,
                        payload: {...response.data, loading: false},
                    })
                },
                error => {
                    console.log('category', sectionId,  error)
                    dispatch({
                        type: GET_TOP_STORIES_FAILURE,
                        sectionId,
                        payload: {error, loading: false},
                    })
                }
            )
	}
}

export function getDetailPageContent(url) {
	return (dispatch) => {
        dispatch({type: GET_COMMENT_START, payload: {loading: true} });
        return service.getComments(url).then(
            response => {
                dispatch({
                    type: GET_COMMENT_DONE,
                    payload: {...response.data, loading: false},
                    url
                })
            },
            error => {
                dispatch({
                    type: GET_COMMENT_FAILURE,
                    url,
                    payload: {error, loading: false},
                })
            }
        )
	}
}


export function search(query, page = 1, searchState) {
    const {query: currentQuery, result} = searchState || {}
    if (query === currentQuery) {
        if (result?.[page] && !result[page].error) {
            return (dispatch) => dispatch({type: SET_ACTIVE_PAGE, payload: {page}})
        }
    }

    return (dispatch) => {
        dispatch({type: SEARCH_START, payload: {query, page}});
       
        return service.search(query, page).then(
            response => {
                console.log('query',  response)
                dispatch({
                    type: SEARCH_DONE,
                    payload: {...response.data.response, page, query, loading: false},
                })
            },
            error => {
                console.log('query',   error)
                dispatch({
                    type: SEARCH_FAILURE,
                    payload: {error, query, page},
                })
            }
        )
	}
}


// export function getPageDetail(location: H.Location<S>): any {
// 	return (dispatch, getState) => {
// 		const state: state.Root = getState();
// 		const hasPage = state.cache[location.pathname];
// 		const item = page && (page['item'] as api.ItemSummary);

// 		// Fix bug: make sure only use item page cache if page.path === item.path
// 		// in case sometimes a show page returns season data from the service
// 		if (page && (!item || page.path === item.path)) {
// 			dispatch({
// 				type: GET_PAGE_DETAIL,
// 				payload: page,
// 				meta: { info: location }
// 			});
// 			// Lists of a page will most likely be in memory, however if some user lists
// 			// have been cleared, for example a bookmark list was changed, then
// 			// we reload these. Also if we've rendered the page on the server then
// 			// some of the standard lists further down the page will need loaded.
// 			return dispatch(page.getTopStories(location.pathname).then(data => dispatch({})));
// 		} 
// 	};
// }