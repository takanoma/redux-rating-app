import * as Actions from './actions';
import initialState from '../store/initialState';

export const ErrorReducer = (state = initialState.error, action) => {
    switch (action.type) {
        case Actions.ERROR:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}