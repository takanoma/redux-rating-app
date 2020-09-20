import {createSelector} from 'reselect';

const usersSelector = (state) => state.users;

export const getUsers = createSelector(
    [usersSelector],
    state => state.list
)
