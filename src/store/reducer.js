import * as AppConfigActionTypes from './appConfig.interface';

const initialState = {
  data: {},
  errors: undefined,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AppConfigActionTypes.FETCH_REQUEST: {
      return {...state, loading: true};
    }
    case AppConfigActionTypes.FETCH_SUCCESS: {
      return {...state, loading: false, data: action.payload};
    }
    case AppConfigActionTypes.FETCH_ERROR: {
      return {...state, loading: false, errors: action.payload};
    }
    default: {
      return state;
    }
  }
};

export {reducer as appConfigReducer};
