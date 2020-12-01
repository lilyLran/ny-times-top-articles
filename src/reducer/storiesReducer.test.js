import stories from './storiesReducer'
import {
    VIEW_CATEGORY_NEWS
} from '../actions/newsActions'

describe('todos reduicer', () => {
  it('should return the initial state', () => {
    expect(stories(undefined, {})).toEqual({})
  })

  it('should set current category', () => {
    const category = 'world'
    expect(
        stories({}, {
        type: VIEW_CATEGORY_NEWS,
        payload: {category}
      })
    ).toEqual(
      {
        'current_category': category
    })
  })
})