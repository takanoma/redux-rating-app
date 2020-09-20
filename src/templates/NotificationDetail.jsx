import React, {useState, useCallback} from 'react';
import {TextInput} from "../components/UIkit";
import {useTranslation} from "react-i18next";

const NotificationDetail = (props) => {
    const [ t ] = useTranslation();
    const [subject, setSubject] = useState(""),
        [body, setBody] = useState("");


    const inputSubject = useCallback((event) => {
        setSubject(event.target.value)
    }, [setSubject]);

    const inputBody = useCallback((event) => {
        setBody(event.target.value)
    }, [setBody]);

    return (
        <section className="c-section-wrapping">
            <h2 className="u-text__headline">{t('NotificationEdit.title')}</h2>
            <div className="c-section__edit">
                <TextInput
                    fullWidth={true} label={t('NotificationEdit.subject')} multiline={false} required={true}
                    onChange={inputSubject} rows={1} value={subject} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={t('NotificationEdit.body')} multiline={true} required={true}
                    onChange={inputBody} rows={5} value={body} type={"text"}
                />
                <div className="module-spacer--small" />
                <div className="module-spacer--small" />

            </div>
        </section>

    )
}
export default NotificationDetail