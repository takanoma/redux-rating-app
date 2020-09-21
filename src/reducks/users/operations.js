import {deleteUserAction, fetchUsersAction} from "./actions";
import {push} from "connected-react-router";
import {FirebaseTimestamp, db} from "../../firebase/index";
import {
    generateRandomChar,
    sendEmail,
    createAuthUser,
    deleteAuthUser
} from "../../functions/common";
import {userRegistrationTitle, userRegistrationBody} from "../../mail/userRegistration";
import {config} from "../../const/config";
import {ROLE_APP, ROLE_SYSTEM} from "../../const/code";
import {errorAction} from "../error/actions";
import {COMMUNICATION_ERROR, USER_EDIT_EMAIL_DUPLICATE_ERROR} from "../../const/errorCode";
import {hideLoadingAction, showLoadingAction} from "../loading/actions";


// 必要に応じて、operation -> action のフローで呼ばれる
const usersRef = db.collection('users')

export const saveUser = (userId, userName, mailAddress, roleId, sectionId) => {
    return async (dispatch) => {
        dispatch(showLoadingAction());
        if (userId === "") {
            usersRef.where("mailAddress", "==", mailAddress).get()
                .then(snapshot => {
                    if (!snapshot.empty) {
                        dispatch(errorAction({
                            errorType: USER_EDIT_EMAIL_DUPLICATE_ERROR,
                            returnValue: mailAddress,
                            args: []
                        }));
                    } else {
                        let password = generateRandomChar(8);
                        createAuthUser(mailAddress, password)
                            .then(user => {
                                if (user) {
                                    const uid = user.data.uid;
                                    // サブコレクションにはしない
                                    const userInitialData = {
                                        userId: uid,
                                        userName: userName,
                                        mailAddress: mailAddress,
                                        roleId: roleId,
                                        sectionId: sectionId,
                                        created_at: FirebaseTimestamp.now(),
                                        updated_at: FirebaseTimestamp.now()
                                    }
                                    usersRef.doc(uid).set(userInitialData)
                                        .then(() => {
                                            sendEmail(mailAddress,userRegistrationTitle,userRegistrationBody(mailAddress, password, config().common.url), 0);
                                            dispatch(hideLoadingAction());
                                            dispatch(push('/users'));
                                        })
                                }
                            }).catch(e => {
                                dispatch(hideLoadingAction());
                                dispatch(errorAction({
                                    errorType: COMMUNICATION_ERROR,
                                    args: []
                                }));
                        })



                    }
                }).catch(e => {
                    dispatch(hideLoadingAction());
                    dispatch(errorAction({
                        errorType: COMMUNICATION_ERROR,
                        args: []
                    }));
            })
        } else {
            const userData = {
                userId: userId,
                userName: userName,
                roleId: roleId,
                sectionId: sectionId,
                updated_at: FirebaseTimestamp.now()
            }
            usersRef.doc(userId).set(userData, {merge: true})
                .then(() => {
                    dispatch(hideLoadingAction());
                    dispatch(push('/users'));
                }).catch(e => {
                    dispatch(hideLoadingAction());
                    dispatch(errorAction({
                        errorType: COMMUNICATION_ERROR,
                        args: []
                    }));
            })
        }
    }
}

export const deleteUser = (uid) => {
    return async (dispatch, getState) => {
        if (!window.confirm("削除してもよろしいですか？")) {
            return false;
        }
        dispatch(showLoadingAction());
        deleteAuthUser(uid)
            .then(result => {
                if (result) {
                    usersRef.doc(uid).delete()
                        .then(result => {
                            const prevUsers = getState().users.list;
                            // 削除される以外のproductをnextProductsに設定
                            const newUsers = prevUsers.filter(user => user.userId !== uid)
                            dispatch(hideLoadingAction());
                            dispatch(deleteUserAction(newUsers));
                        })
                }
        }).catch(e => {
            dispatch(errorAction({
                errorType: COMMUNICATION_ERROR,
                args: []
            }));
            dispatch(hideLoadingAction());
        })
    }

}

export const fetchUsers = (roleId, sectionId) => {
    return async (dispatch) => {
        // storeで管理する？
        const sections = await db.collection('sections').get()
            .then(snapshots => {
                const results = [];
                snapshots.forEach(snapshot => {
                    const result = snapshot.data();
                    results.push(result);
                })
                return results;
            })
        const roles = await db.collection('roles').get()
            .then(snapshots => {
                const results = [];
                snapshots.forEach(snapshot => {
                    const result = snapshot.data();
                    results.push(result);
                })
                return results;
            })

        usersRef.orderBy('updated_at', 'desc').get()
            .then(snapshots => {
                const users = []
                snapshots.forEach(snapshot => {
                    const user = snapshot.data();
                    if (roleId === ROLE_SYSTEM || roleId === ROLE_APP) {
                        user.sectionName = sections.filter(section => section.sectionId === user.sectionId)[0].sectionName;
                        user.roleName = roles.filter(role => role.roleId === user.roleId)[0].roleName;
                        users.push(user);
                    } else if (sectionId === user.sectionId) {
                        user.sectionName = sections.filter(section => section.sectionId === user.sectionId)[0].sectionName;
                        user.roleName = roles.filter(role => role.roleId === user.roleId)[0].roleName;
                        users.push(user);
                    }
                })
                dispatch(fetchUsersAction(users))
            })
    }
}

