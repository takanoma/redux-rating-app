import * as Actions from './actions';
import initialState from '../store/initialState';

// actionが発生した際に、どのようにstateを変化させるか設定する
export const NotificationsReducer = (state = initialState.notifications, action) => {
    switch (action.type) {
        case Actions.FETCH_NOTIFICATIONS:
            return {
                ...state,  // これを書き忘れると、stateが変わらず、2回目のレンダーがされない
                list: [...action.payload]
            }
        case Actions.DELETE_NOTIFICATION:
            return {
                ...state,
                list: [...action.payload]
            }
        default:
            return state
    }
}