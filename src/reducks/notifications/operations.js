import {fetchNotificationsAction, deleteNotificationAction} from "./actions";
import {push} from "connected-react-router";
import {FirebaseTimestamp, db} from "../../firebase/index";
import {
    generateRandomChar
} from "../../functions/common";
import {errorAction} from "../error/actions";
import {COMMUNICATION_ERROR} from "../../const/errorCode";
import {datetimeToString} from "../../functions/common";

// 必要に応じて、operation -> action のフローで呼ばれる
const notificationsRef = db.collection('notifications')

export const saveNotification = (id, subject, body) => {
    return async (dispatch) => {
        if (id === "") {
            const notificationData = {
                id: generateRandomChar(7) + FirebaseTimestamp.now().toMillis(),
                subject: subject,
                body: body,
                readStatus: [],
                created_at: FirebaseTimestamp.now(),
                updated_at: FirebaseTimestamp.now()
            }
            notificationsRef.doc(notificationData.id).set(notificationData)
                .then(() => {
                    dispatch(push('/'));
                }).catch(e => {
                    console.info(e);
                    dispatch(errorAction({
                        errorType: COMMUNICATION_ERROR,
                        args: []
                    }));
            })
        } else {
            const notificationData = {
                id: id,
                subject: subject,
                body: body,
                updated_at: FirebaseTimestamp.now()
            }
            notificationsRef.doc(id).set(notificationData)
                .then(() => {
                    dispatch(push('/'));
                }).catch(e => {
                    dispatch(errorAction({
                        errorType: COMMUNICATION_ERROR,
                        args: []
                    }));
            })
        }
    }
}

export const fetchNotifications = () => {
    return async (dispatch) => {
        notificationsRef.orderBy('updated_at', 'desc').get()
            .then(snapshots => {
                const notifications = [];
                snapshots.forEach(snapshot => {
                    const notification = snapshot.data();
                    notification.updated_at = datetimeToString(notification.updated_at.toDate());
                    notifications.push(notification);
                })
                dispatch(fetchNotificationsAction(notifications))
            }).catch(e => {
                dispatch(errorAction({
                    errorType: COMMUNICATION_ERROR,
                    args: []
                }));
        })
    }
}

export const deleteNotification = (id) => {
    return async (dispatch, getState) => {
        if (!window.confirm("削除してもよろしいですか？")) {
            return false;
        }
        notificationsRef.doc(id).delete()
            .then(result => {
                const prevNotifications = getState().notifications.list;
                const newNotifications = prevNotifications.filter(notification => notification.id !== id)
                dispatch(deleteNotificationAction(newNotifications));
                dispatch(push('/'))
            }).catch(e => {
                dispatch(errorAction({
                    errorType: COMMUNICATION_ERROR,
                    args: []
                }));
        })
    }

}

