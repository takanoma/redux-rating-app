export const FETCH_USERS = "FETCH_USERS";
export const fetchUsersAction = (users) => {
    return {
        type: "FETCH_USERS",
        payload: users
    }
}
export const DELETE_USER = "DELETE_USER";
export const deleteUserAction = (users) => {
    return {
        type: "DELETE_USER",
        payload: users
    }
}

// export const ERROR = "ERROR";
// export const errorAction = (type) => {
//     return {
//         type: "ERROR",
//         payload: {
//             errorType: type
//         }
//     }
// }