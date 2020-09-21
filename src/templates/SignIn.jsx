import React, {useCallback, useEffect, useState} from 'react';
import {PrimaryButton, TextInput} from "../components/UIkit";
import {signIn} from "../reducks/user/operations";
import {useDispatch, useSelector} from "react-redux";
import {push} from "connected-react-router";
import {auth} from "../firebase";
import {useTranslation} from "react-i18next";
import {isValidEmailFormat} from "../functions/common";
import {getError} from "../reducks/error/selectors";
import {errorAction} from "../reducks/error/actions";

const SignIn = () => {
    const [ t ] = useTranslation();
    const dispatch = useDispatch();

    const error = getError(useSelector(state => state));

    const [email, setEmail] = useState(""),
        [password, setPassword] = useState(""),
        [emailHelperText, setEmailHelperText] = useState(""),
        [passwordHelperText, setPasswordHelperText] = useState("");

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value);
    }, [setEmail]);

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    }, [setPassword]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                dispatch(push('/'))
            }
        });

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = () => {
        setEmailHelperText("");
        setPasswordHelperText("");
        dispatch(errorAction({
            errorType: "",
            args: []
        }));
        let hasError = false;
        if (email === "") {
            setEmailHelperText(t('SignIn.emailNoInputError'));
            hasError = true;
        } else if (!isValidEmailFormat(email)) {
            setEmailHelperText(t('SignIn.emailInvalidError'));
            hasError = true;
        }
        if (password === "") {
            setPasswordHelperText(t('SignIn.passwordNoInputError'));
            hasError = true;
        }

        if (hasError) {
            return;
        }

        dispatch(signIn(email, password));
    }

    return (
        <div className="c-section-wrapping">
            <h2 className="u-text__headline u-text-center">{t('SignIn.title')}</h2>
            <div className="module-spacer--medium" />
            {error && error.errorType && (
                <div className="c-section__login__error">
                    {t(error.errorType)}
                </div>
                )
            }
            <div className="c-section__login">
                <TextInput
                    fullWidth={true} label={t('SignIn.email')} multiline={false} required={true}
                    rows={1} value={email} type={"email"} onChange={inputEmail} helperText={emailHelperText} hasError={emailHelperText !== ""}
                />
                <TextInput
                    fullWidth={true} label={t('SignIn.password')} multiline={false} required={true}
                    rows={1} value={password} type={"password"} onChange={inputPassword} helperText={passwordHelperText} hasError={passwordHelperText !== ""}
                />
                <div className="module-spacer--medium" />
                <div className={"center"}>
                    <PrimaryButton
                    label={t('SignIn.signIn')}
                    onClick={() => onSubmit()}
                    />
                    <div className="module-spacer--small" />
                    <p className="c-section__login-text-link">{t('SignIn.forgetPassword')}<span onClick={() => dispatch(push('/signin/reset'))}>{t('SignIn.here')}</span></p>
                </div>
            </div>
        </div>
    )
}

export default SignIn