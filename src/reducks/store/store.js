import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunk from 'redux-thunk';

import {UserReducer} from "../user/reducers";
import {UsersReducer} from "../users/reducers";
import {ErrorReducer} from "../error/reducers";
import {NotificationsReducer} from "../notifications/reducers";
import {LoadingReducer} from "../loading/reducers";

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            loading: LoadingReducer,
            user: UserReducer,
            users: UsersReducer,
            notifications: NotificationsReducer,
            error: ErrorReducer
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}