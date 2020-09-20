import * as Actions from './actions';
import initialState from '../store/initialState';

// actionが発生した際に、どのようにstateを変化させるか設定する
export const UserReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload
            }
        case Actions.SIGN_OUT:
            return {
                // サインアウト時は既存のあたいは捨てて、初期状態に戻す
                ...action.payload
            }
        default:
            return state
    }
}