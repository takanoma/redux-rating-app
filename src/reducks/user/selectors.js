import {createSelector} from 'reselect';

const userSelector = (state) => state.user;

export const getIsSignedIn = createSelector(
    [userSelector],
    state => state.isSignedIn
)

export const getUserId = createSelector(
    [userSelector],
    state => state.userId
)

export const getRoleId = createSelector(
    [userSelector],
    state => state.roleId
)

export const getUserName = createSelector(
    [userSelector],
    state => state.userName
)

export const getSectionId = createSelector(
    [userSelector],
    state => state.sectionId
)