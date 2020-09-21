import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {PrimaryButton} from "../components/UIkit";
import {makeStyles} from "@material-ui/core/styles";
import {push} from "connected-react-router";
import {getUsers} from "../reducks/users/selectors";
import {fetchUsers, deleteUser} from "../reducks/users/operations";
import {getUserId} from "../reducks/user/selectors";
import {useTranslation} from "react-i18next";
import {ROLE_SYSTEM} from "../const/code";


const useStyles = makeStyles(() => ({
    list: {
        background: '#D4E5F0'
    },
    button: {
        display: "inline-block",
        padding: "7px 7px",
        margin: "0 5px",
        width: "100px",
        backgroundColor: "#668ad8",
        color: "#fff",
        borderRadius: "3px",
        "&:hover": {
            backgroundColor: "#8fa9e2"
        }
    }

}))


const UserList = () => {
    const [ t ] = useTranslation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const roleId = selector.user.roleId;
    const sectionId = selector.user.sectionId;
    const userId = getUserId(selector);
    const users = getUsers(selector);

    useEffect(() => {
        // roleIdに応じた値をstateに保存する
        dispatch(fetchUsers(roleId, sectionId));
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section className="c-section-wrapping">
            <h2 className="u-text__headline">{t('UserList.title')}</h2>
            <div className="c-section__list">
                <div className="c-section-button_right">
                    <PrimaryButton
                        label={t('UserList.newRegister')}
                        onClick={() => dispatch(push('/user/edit'))}
                    />
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead className={classes.list}>
                            <TableRow>
                                <TableCell>{t('UserList.name')}</TableCell>
                                <TableCell>{t('UserList.email')}</TableCell>
                                <TableCell>{t('UserList.section')}</TableCell>
                                <TableCell>{t('UserList.role')}</TableCell>
                                <TableCell>{t('UserList.operation')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 && (
                                users.map(user => (
                                    <TableRow key={user.userId}>
                                        <TableCell>{user.userName}</TableCell>
                                        <TableCell>{user.mailAddress}</TableCell>
                                        <TableCell>{user.sectionName}</TableCell>
                                        <TableCell>{user.roleName}</TableCell>
                                        <TableCell>
                                            {
                                                user.roleId !== ROLE_SYSTEM && (
                                                    <button className={classes.button} onClick={() => dispatch(push('/user/edit/' + user.userId))}>{t('UserList.edit')}</button>
                                                )
                                            }
                                            {
                                                user.roleId !== ROLE_SYSTEM && userId !== user.userId && (
                                                    <button className={classes.button} onClick={() => dispatch(deleteUser(user.userId))}>{t('UserList.delete')}</button>
                                                )
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </section>

    )
};

export default UserList