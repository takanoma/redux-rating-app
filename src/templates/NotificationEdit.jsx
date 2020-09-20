import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {PrimaryButton, TextInput, SecondaryButton} from "../components/UIkit";
import {db} from "../firebase";
import {useTranslation} from "react-i18next";
import {saveNotification, deleteNotification} from "../reducks/notifications/operations";
import {push} from "connected-react-router";
import {ROLE_APP} from "../const/code";


const NotificationEdit = (props) => {
    const [ t ] = useTranslation();
    let path = window.location.pathname;
    let isDetail = path.indexOf("notifications") !== -1;

    let notificationId = isDetail ? path.split('/notifications')[1] : path.split('/notification/edit')[1];

    if (notificationId && notificationId !== "") {
        notificationId = notificationId.split('/')[1];
    }

    const selector = useSelector(state => state);

    const dispatch = useDispatch();
    const [subject, setSubject] = useState(""),
        [body,setBody] = useState(""),
        [subjectHelperText, setSubjectHelperText] = useState(""),
        [bodyHelperText, setBodyHelperText] = useState("");


    const inputSubject = useCallback((event) => {
        setSubject(event.target.value)
    }, [setSubject]);

    const inputBody = useCallback((event) => {
        setBody(event.target.value)
    }, [setBody]);

    useEffect(() => {
        if (notificationId !== "") {
            db.collection('notifications').doc(notificationId).get()
                .then(snapshot => {
                    const data = snapshot.data();
                    setSubject(data.subject);
                    setBody(data.body);
                })
        }
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = () => {
        setSubjectHelperText("");
        setBodyHelperText("");
        let hasError = false;
        if (subject === "") {
            setSubjectHelperText(t('NotificationEdit.subjectNoInputError'));
            hasError = true;
        }
        if (body === "") {
            setBodyHelperText(t('NotificationEdit.bodyNoInputError'));
            hasError = true;
        }

        if (hasError) {
            return;
        }

        dispatch(saveNotification(notificationId, subject, body));
    }

    return (
        <section className="c-section-wrapping">
            <h2 className="u-text__headline">{isDetail ? t('NotificationEdit.detailTitle') : t('NotificationEdit.title')}</h2>
            <div className="c-section__edit">
                <TextInput
                    fullWidth={true} label={t('NotificationEdit.subject')} multiline={false} required={true} variant={isDetail ? "filled" : "outlined"}
                    onChange={inputSubject} rows={1} value={subject} type={"text"} helperText={subjectHelperText} hasError={subjectHelperText !== ""}
                />
                <TextInput
                    fullWidth={true} label={t('NotificationEdit.body')} multiline={true} required={true}  variant={isDetail ? "filled" : "outlined"}
                    onChange={inputBody} rows={5} value={body} type={"text"} helperText={bodyHelperText} hasError={bodyHelperText !== ""}
                />
                <div className="module-spacer--small" />
                <div className="module-spacer--small" />
                {
                    !isDetail && (
                        <div className="center">
                            <PrimaryButton
                                label={t('NotificationEdit.register')}
                                onClick={() => onSubmit()}
                            />
                        </div>
                    )
                }
                {
                    isDetail && selector.user.roleId <= ROLE_APP && (
                        <div className="c-section-button_right">
                            <SecondaryButton
                                label={t('NotificationEdit.edit')}
                                onClick={() => dispatch(push('/notification/edit/' + notificationId))}
                            />
                            <SecondaryButton
                                label={t('NotificationEdit.delete')}
                                onClick={() => dispatch(deleteNotification(notificationId))}
                            />
                        </div>
                    )
                }

            </div>
        </section>

    )

}
export default NotificationEdit