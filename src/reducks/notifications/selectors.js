import {createSelector} from 'reselect';

const usersSelector = (state) => state.notifications;

export const getNotifications = createSelector(
    [usersSelector],
    state => state.list
)