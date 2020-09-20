import React, {useCallback, useState} from 'react';
import {PrimaryButton, TextInput} from "../components/UIkit";
import { resetPassword } from "../reducks/user/operations";
import {useDispatch, useSelector} from "react-redux";
import {push} from "connected-react-router";
import {useTranslation} from "react-i18next";
import {getError} from "../reducks/error/selectors";
import {errorAction} from "../reducks/error/actions";
import {isValidEmailFormat} from "../functions/common";

const Reset = () => {
    const [ t ] = useTranslation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState(""),
    [emailHelperText, setEmailHelperText] = useState("")

    const error = getError(useSelector(state => state));

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail]);

    const onSubmit = () => {
        setEmailHelperText("");
        dispatch(errorAction({
            errorType: "",
            args: []
        }));
        if (email === "") {
            setEmailHelperText(t('Reset.emailNoInputError'));
            return;
        } else if (!isValidEmailFormat(email)) {
            setEmailHelperText(t('Reset.emailInvalidError'));
            return;
        }

        dispatch(resetPassword(email));
    }

    const onBackToLogin = () => {
        dispatch(errorAction({
            errorType: "",
            args: []
        }));
        dispatch(push('/signin'));
    }


    return (
        <div className="c-section-wrapping">
            <h2 className="u-text__headline u-text-center">{t('Reset.title')}</h2>
            <div className="module-spacer--medium" />
            {error && error.errorType && (
                <div className="c-section__login__error">
                    {t(error.errorType)}
                </div>
            )
            }
            <div className="c-section__login">
                <TextInput
                    fullWidth={true} label={t('Reset.email')} multiline={false} required={true}
                    rows={1} value={email} type={"email"} onChange={inputEmail} helperText={emailHelperText} hasError={emailHelperText !== ""}
                />
                <div className="module-spacer--medium" />
                <div className={"center"}>
                    <PrimaryButton
                        label={t('Reset.passwordReset')}
                        onClick={() => onSubmit()}
                    />
                    <div className="module-spacer--small" />
                    <p className="u-text-small c-section__login-text-link">
                        <a href="/#" onClick={() => onBackToLogin()}>{t('Reset.backToLogin')}</a></p>
                </div>
            </div>

        </div>
    )
}

export default Reset