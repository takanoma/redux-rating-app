import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core/styles";
import { useTranslation } from 'react-i18next';
import {PrimaryButton} from "../components/UIkit";
import {push} from "connected-react-router";
import {fetchNotifications} from "../reducks/notifications/operations";
import {ROLE_APP} from "../const/code";

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
    },
    title: {
        width: "70%"
    },
    postDate: {
        width: "30%"
    },
    tableContent: {
        "&:hover": {
            backgroundColor: "#eeeeee",
            cursor: "pointer"
        }
    }

}))

const NotificationList = () => {
    const [ t ] = useTranslation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    useEffect(() => {
        dispatch(fetchNotifications());
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <section className="c-section-wrapping">
            <h2 className="u-text__headline">{t('Notification.title')}</h2>
            <div className="c-section__list">
                {
                    selector.user.roleId <= ROLE_APP && (
                        <div className="c-section-button_right">
                            <PrimaryButton
                                label={t('UserList.newRegister')}
                                onClick={() => dispatch(push('/notification/edit'))}
                            />
                        </div>
                    )
                }
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead className={classes.list}>
                            <TableRow>
                                <TableCell className={classes.title}>{t('Notification.tableTitle')}</TableCell>
                                <TableCell className={classes.postDate}>{t('Notification.tablePostDate')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                selector.notifications.list.length > 0 && (
                                    selector.notifications.list.map((notification, index) => (
                                        <TableRow key={index} className={classes.tableContent} onClick={() => dispatch(push('/notifications/' + notification.id))}>
                                            <TableCell>{notification.subject}</TableCell>
                                            <TableCell>{notification.updated_at}</TableCell>
                                        </TableRow>
                                    ))
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </section>
    )
};

export default NotificationList