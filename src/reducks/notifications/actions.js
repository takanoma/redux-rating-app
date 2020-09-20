export const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";
export const fetchNotificationsAction = (notifications) => {
    return {
        type: "FETCH_NOTIFICATIONS",
        payload: notifications
    }
}
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const deleteNotificationAction = (notifications) => {
    return {
        type: "DELETE_NOTIFICATION",
        payload: notifications
    }
}