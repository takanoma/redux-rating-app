import {signInAction, signOutAction} from "./actions";
import {errorAction} from "../error/actions";
import {push} from "connected-react-router";
import {auth, db} from "../../firebase/index";
import {SIGNIN_FAILED_SIGNED_IN, RESET_SEND_EMAIL, RESET_NOT_EXIST_EMAIL} from "../../const/errorCode";

// 必要に応じて、operation -> action のフローで呼ばれる
const usersRef = db.collection('users')

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid
                console.info("uid = " + uid);
                usersRef.doc(uid).get()
                    .then(snapshots => {
                        const data = snapshots.data()
                        dispatch(signInAction({
                            isSignedIn: true,
                            userId: uid,
                            userName: data.userName,
                            mailAddress: data.mailAddress,
                            roleId: data.roleId,
                            sectionId: data.sectionId,
                            image: data.image
                        }))
                    })

            // サインインされていない場合は、サイン画面に繊維
            } else {
                dispatch(push('/signin'))
            }
        })
    }
}

export const signIn = (email, password) => {
    return async (dispatch) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user

                if (user) {
                    const uid = user.uid;
                    usersRef.doc(uid).get()
                        .then(snapshots => {
                            const data = snapshots.data()
                            dispatch(signInAction({
                                isSignedIn: true,
                                roleId: data.roleId,
                                userId: uid,
                                userName: data.userName,
                                mailAddress: data.mailAddress,
                                sectionId: data.sectionId,
                                image: data.image
                            }))
                            dispatch(push('/'))
                        })
                }
            }).catch(e => {
                dispatch(errorAction({
                    errorType: SIGNIN_FAILED_SIGNED_IN,
                    args: []
                }));
        })
    }
}

export const resetPassword = (email) => {
    return async (dispatch) => {

        auth.sendPasswordResetEmail(email)
            .then(() => {
                dispatch(errorAction({
                    errorType: RESET_SEND_EMAIL,
                    args: []
                }));
                dispatch(push('/signin'))
            }).catch(() => {
            dispatch(errorAction({
                errorType: RESET_NOT_EXIST_EMAIL,
                args: []
            }));
            })

    }
}

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
            .then(() => {
                // firebaseの認証をsignOut状態にしたら、reduxの状態もsignOut状態にする
                dispatch(signOutAction());
                dispatch(push('/signin'))
            })
    }
}



