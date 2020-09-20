import {createSelector} from 'reselect';

const userSelector = (state) => state.error;

export const getError = createSelector(
    [userSelector],
    state => state
)