import * as service from '../service/articleService'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    GET_TOP_STORIES_START,
    GET_TOP_STORIES,
    getCategorizedNews,
    VIEW_CATEGORY_NEWS
} from './newsActions';

describe('news actions', () => {
	describe('getCategorizedNews', () => {
		it('should dispatch actions to get news', done => {
			const store = configureStore([thunk])({
				stories: {}
            });
        
            const response = {
                data: {
                    section: "home", 
                    result: [{"section":"us",}]
                },
                status: 200
            }
			const serviceStub = jest.spyOn(service, 'getTopStories').mockImplementation(() => {
				return Promise.resolve(response)
            })
            
            const category = 'home'
			store.dispatch(getCategorizedNews(category)).then(() => {
                const actions = store.getActions();
                console.log('actions...', actions)
                expect(actions).toEqual([
                    { type: VIEW_CATEGORY_NEWS, payload: {category} },
                    { type: GET_TOP_STORIES_START,  sectionId: category, payload: {loading: true} },
                    { type: GET_TOP_STORIES, sectionId: category, payload: {...response.data, loading: false} }]
                );

				serviceStub.mockRestore();
				done();
			});
		});
	});
});
