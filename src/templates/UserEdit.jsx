import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {TextInput} from "../components/UIkit";
import {PrimaryButton} from "../components/UIkit";
import {SelectBox} from "../components/UIkit";
import {db} from "../firebase";
import {saveUser} from "../reducks/users/operations";
import {ROLE_SYSTEM, ROLE_APP} from "../const/code";
import {getRoleId, getSectionId} from "../reducks/user/selectors";
import {useTranslation} from "react-i18next";
import {isValidEmailFormat} from "../functions/common";
import {errorAction} from "../reducks/error/actions";
import {USER_EDIT_EMAIL_DUPLICATE_ERROR} from "../const/errorCode";
import {getError} from "../reducks/error/selectors";


const UserEdit = (props) => {
    const [ t ] = useTranslation();
    let path = window.location.pathname;
    let userId = path.split('/user/edit')[1]
    if (userId && userId !== "") {
        userId = userId.split('/')[1];
    }

    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const error = getError(useSelector(state => state));
    const roleId = getRoleId(selector);
    const sectionId = getSectionId(selector);
    const [mailAddress, setMailAddress] = useState(""),
        [role, setRole] = useState(""),
        [roles, setRoles] = useState([]),
        [userName, setUserName] = useState(""),
        [section, setSection] = useState(""),
        [sections, setSections] = useState([]),
        [userNameHelper, setUserNameHelper] = useState(""),
        [mailAddressHelper, setMailAddressHelper] = useState(""),
        [roleHelper, setRoleHelper] = useState(""),
        [sectionHelper, setSectionHelper] = useState("");

    const inputMailAddress = useCallback((event) => {
        setMailAddress(event.target.value)
    }, [setMailAddress]);

    const inputUserName = useCallback((event) => {
        setUserName(event.target.value)
    }, [setUserName]);


    // 最初のレンダリング完了時のみ呼ばれる
    useEffect(() => {
        db.collection('roles')
            .orderBy('order', 'desc')
            .get()
            .then(snapshots => {
                const list = []
                snapshots.forEach(snapshot => {
                    const data = snapshot.data()
                    if (data.roleId !== ROLE_SYSTEM && selector.user.roleId <= data.roleId) {
                        list.push({
                            id: data.roleId,
                            name: data.roleName
                        })
                    }
                })
                setRoles(list)
            });

        db.collection('sections')
            .orderBy('order', 'asc')
            .get()
            .then(snapshots => {
                const list = []
                snapshots.forEach(snapshot => {
                    const data = snapshot.data()
                    if (roleId !== ROLE_SYSTEM && roleId !== ROLE_APP) {
                        if (sectionId === data.sectionId) {
                            list.push({
                                id: data.sectionId,
                                name: data.sectionName
                            })
                        }
                    } else {
                        list.push({
                            id: data.sectionId,
                            name: data.sectionName
                        })
                    }
                })
                setSections(list)
            })
        if (userId !== "") {
            db.collection('users').doc(userId).get()
                .then(snapshot => {
                    const data = snapshot.data();
                    setMailAddress(data.mailAddress);
                    setRole(data.roleId);
                    setUserName(data.userName);
                    setSection(data.sectionId);
                })
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = () => {
        setUserNameHelper("");
        setMailAddressHelper("");
        setRoleHelper("");
        setSectionHelper("");
        dispatch(errorAction({
            errorType: "",
            returnValue: "",
            args: []
        }));
        let hasError = false;
        if (mailAddress === "") {
            setMailAddressHelper(t('UserEdit.emailNoInputError'));
            hasError = true;
        } else if (!isValidEmailFormat(mailAddress)) {
            setMailAddressHelper(t('UserEdit.emailInvalidError'));
            hasError = true;
        }
        if (userName === "") {
            setUserNameHelper(t('UserEdit.userNameNoInputError'));
            hasError = true;
        }
        if (role === "") {
            setRoleHelper(t('UserEdit.roleNoInputError'));
            hasError = true;
        }
        if (section === "") {
            setSectionHelper(t('UserEdit.sectionNoInputError'));
            hasError = true;
        }

        if (hasError) {
            return;
        }
        dispatch(saveUser(userId, userName, mailAddress, role, section));
    }

    return (
        <section className="c-section-wrapping">
            <h2 className="u-text__headline">{t('UserEdit.title')}</h2>
            {error && error.errorType && (
                <div className="c-section__login__error">
                    {
                        error.errorType === USER_EDIT_EMAIL_DUPLICATE_ERROR ?
                            t(error.errorType, {email: error.returnValue}) :
                            t(error.errorType)
                    }
                </div>
                )
            }
            <div className="c-section__edit">
                <TextInput
                    fullWidth={true} label={t('UserEdit.email')} multiline={false} required={true} variant="outlined"
                    onChange={inputMailAddress} rows={1} value={mailAddress} type={"text"} helperText={mailAddressHelper} hasError={mailAddressHelper !== ""} disabled={userId !== ""}
                />
                <SelectBox
                    disabled={Number(role) === ROLE_SYSTEM}
                    label={t('UserEdit.role')} options={roles} required={true} select={setRole} value={role} helperText={roleHelper} error={roleHelper !== ""}
                />
                <TextInput
                    fullWidth={true} label={t('UserEdit.name')} multiline={false} required={true} variant="outlined"
                    onChange={inputUserName} rows={1} value={userName} type={"text"} helperText={userNameHelper} hasError={userNameHelper !== ""}
                />
                <SelectBox
                    label={t('UserEdit.section')} options={sections} required={true} select={setSection} value={section} helperText={sectionHelper} error={sectionHelper !== ""}
                />
                <div className="module-spacer--small" />
                <div className="module-spacer--small" />
                <div className="center">
                    <PrimaryButton
                        label={t('UserEdit.register')}
                        onClick={() => onSubmit()}
                    />
                </div>
            </div>
        </section>

    )

}
export default UserEdit